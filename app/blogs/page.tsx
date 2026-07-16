'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, CalendarDays } from 'lucide-react';
import { blogs, blogCategories } from '@/lib/blogs';
import NewsletterSignup from '@/components/NewsletterSignup';

const PAGE_SIZE = 6;

export default function BlogsPage() {
  const [featured, ...rest] = blogs;
  const popular = blogs.slice(0, 5);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rest.filter((post) => {
      if (category && post.category !== category) return false;
      if (
        query &&
        !post.title.toLowerCase().includes(query) &&
        !post.excerpt.toLowerCase().includes(query)
      ) {
        return false;
      }

      return true;
    });
  }, [rest, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const showFeatured = !search && !category && page === 1;
  const startResult = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endResult = Math.min(page * PAGE_SIZE, filtered.length);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryClick(name: string) {
    setCategory((prev) => (prev === name ? null : name));
    setPage(1);
  }

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
            {showFeatured && (
              <>
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
                    <span className="text-sm font-semibold text-brand-red">Read More -&gt;</span>
                  </div>
                </Link>
              </>
            )}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {category ? category : 'All Blogs'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {filtered.length === 0
                    ? 'No articles found'
                    : `Showing ${startResult}-${endResult} of ${filtered.length} articles`}
                </p>
              </div>
              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory(null);
                    setPage(1);
                  }}
                  className="text-xs font-semibold text-brand-red hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {paginated.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-16 text-center text-sm text-slate-500">
                No blogs match your search. Try a different keyword or category.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post) => (
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
                      <span className="text-xs font-semibold text-brand-red">Read More -&gt;</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold ${
                      page === i + 1
                        ? 'bg-brand-blue text-white'
                        : 'border border-slate-300 text-slate-600 hover:border-brand-blue'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search blogs..."
                className="field-input pl-9"
              />
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-900">Categories</h3>
              <ul className="space-y-2.5">
                {blogCategories.map((c) => (
                  <li key={c.name}>
                    <button
                      onClick={() => handleCategoryClick(c.name)}
                      className={`flex w-full items-center justify-between text-left text-sm transition-colors ${
                        category === c.name
                          ? 'font-semibold text-brand-red'
                          : 'text-slate-600 hover:text-brand-red'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-slate-400">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-900">Popular Posts</h3>
              <ul className="space-y-4">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blogs/${p.slug}`} className="flex gap-4 group">
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 shadow-sm">
                        <Image 
                          src={p.image} 
                          alt={p.title} 
                          fill 
                          className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                        <p className="mt-1.5 text-xs text-slate-400">{p.date}</p>
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
