import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, CalendarDays } from 'lucide-react';
import { blogs, blogCategories } from '@/lib/blogs';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata = { title: 'Blogs | Thinkarz' };

export default function BlogsPage() {
  const [featured, ...rest] = blogs;
  const popular = blogs.slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        </div>
        <div className="container-page relative py-16 sm:py-20">
          <span className="section-eyebrow">Blogs</span>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Car Insights.
            <br />
            Expert Advice.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
            Stay updated with the latest automotive trends, tips and news from the world of cars.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {/* Featured blog */}
            <div className="mb-3">
              <span className="section-eyebrow">Featured Blog</span>
            </div>
            <Link
              href={`/blogs/${featured.slug}`}
              className="mb-12 grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <span className="mb-3 w-fit rounded-full bg-brand-blueLight px-3 py-1 text-xs font-semibold text-brand-blue">
                  {featured.category}
                </span>
                <h2 className="mb-3 text-xl font-bold text-slate-900">{featured.title}</h2>
                <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>
                <p className="mb-4 text-sm text-slate-600">{featured.excerpt}</p>
                <span className="text-sm font-semibold text-brand-red">Read More →</span>
              </div>
            </Link>

            <h2 className="mb-6 text-xl font-extrabold text-slate-900">All Blogs</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-brand-blueLight px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue">
                      {post.category}
                    </span>
                    <h3 className="mb-2 text-sm font-bold leading-snug text-slate-900">
                      {post.title}
                    </h3>
                    <div className="mb-3 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{post.date}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-xs font-semibold text-brand-red">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold ${
                    n === 1
                      ? 'bg-brand-blue text-white'
                      : 'border border-slate-300 text-slate-600'
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search blogs..." className="field-input pl-9" />
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-900">Categories</h3>
              <ul className="space-y-2.5">
                {blogCategories.map((c) => (
                  <li key={c.name} className="flex items-center justify-between text-sm text-slate-600">
                    <span>{c.name}</span>
                    <span className="text-slate-400">{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-900">Popular Posts</h3>
              <ul className="space-y-4">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blogs/${p.slug}`} className="flex gap-3">
                      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-snug text-slate-900">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">{p.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-brand-navy p-6 text-white">
              <h3 className="mb-1.5 text-sm font-bold">Never Miss an Update</h3>
              <p className="mb-4 text-xs text-slate-300">
                Subscribe to our newsletter and get the latest car news, tips and offers.
              </p>
              <NewsletterSignup />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
