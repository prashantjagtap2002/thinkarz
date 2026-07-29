'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, CalendarDays } from 'lucide-react';
import { blogs, blogCategories } from '@/lib/blogs';

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
            src="/images/hero-banner.jpg"
            alt="Blogs"
            title="THINKARZ Blogs - Car Insights & Expert Advice"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        </div>
        <div className="container-page relative py-16 text-center sm:text-left sm:py-20">
          <span className="section-eyebrow">Blogs</span>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl mx-auto sm:mx-0">
            Car Insights.
            <br className="hidden sm:inline" />{" "}
            Expert Advice.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 mx-auto sm:mx-0">
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
                    <Image src={featured.image} alt={featured.title} title={featured.title} fill className="object-cover" />
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
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="bg-slate-50 p-3 sm:p-5">
                      <div className="relative mb-3 sm:mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg">
                        <Image
                          src={post.image}
                          alt={post.title}
                          title={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    <div className="bg-white p-3 pt-0 sm:p-5 sm:pt-0">
                      <span className="mb-2 inline-block rounded-full bg-brand-blueLight px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-brand-blue">
                        {post.category}
                      </span>
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-brand-red">Read More &rarr;</span>
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

          <aside className="space-y-6">
            {/* Search Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-900">Search Articles</h3>
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition-colors focus:border-brand-red focus:bg-white focus:ring-1 focus:ring-brand-red"
                />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-900">Categories</h3>
              <div className="flex flex-col gap-2">
                {blogCategories.map((c) => {
                  const isActive = category === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleCategoryClick(c.name)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-red text-white shadow-md'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-brand-red'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'
                      }`}>
                        {c.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Posts Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-900">Popular Posts</h3>
              <ul className="space-y-2.5">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blogs/${p.slug}`} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50">
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-100 shadow-sm">
                        <Image 
                          src={p.image} 
                          alt={p.title}
                          title={p.title}
                          fill 
                          className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="text-xs font-bold leading-snug text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                        <p className="mt-1 text-[11px] font-medium text-slate-400">{p.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
