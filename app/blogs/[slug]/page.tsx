import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import { blogs } from '@/lib/blogs';

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  return { title: post ? `${post.title} | Thinkarz Blog` : 'Blog Not Found | Thinkarz' };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <article className="container-page py-10 sm:py-14">
      <Link
        href="/blogs"
        className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
      >
        <ArrowLeft size={16} /> Back to Blogs
      </Link>

      <span className="mb-3 inline-block rounded-full bg-brand-blueLight px-3 py-1 text-xs font-semibold text-brand-blue">
        {post.category}
      </span>
      <h1 className="mb-3 max-w-3xl text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
        {post.title}
      </h1>
      <div className="mb-8 flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} /> {post.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={15} /> {post.readTime}
        </span>
      </div>

      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
      </div>

      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
        {post.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph.replace(/\n/g, '<br/>').split('<br/>').map((line, j, arr) => (
            <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
          ))}</p>
        ))}
        <p className="pt-4 border-t border-slate-100">
          Have more questions? Our team is always happy to help &mdash; visit our showroom in
          Malad (West), Mumbai, or reach out through our{' '}
          <Link href="/contact-us" className="font-semibold text-brand-red hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="mb-6 text-xl font-extrabold text-slate-900">More Articles</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blogs/${r.slug}`}
                className="overflow-hidden rounded-xl border border-slate-200"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image src={r.image} alt={r.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold leading-snug text-slate-900">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
