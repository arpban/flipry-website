import FlipbookIframe from './components/FlipbookIframe';
import { Sparkles, Zap, Maximize2, Server, Cloud, Mouse } from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="w-full bg-white font-sans">
      <header className="h-24  w-full">
        <nav className='container--boxed flex items-center justify-between h-full'>
          <div className='text-3xl font-semibold'>
            Flipry <span className='text-sm text-zinc-500'>
              Beta
            </span>
          </div>
          <div>
            <Link href="/signup" className='bg-zinc-900 text-white px-4 py-2 rounded-md'>
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="w-full">
        <section className='py-20 pb-30'>
          <div className='container--boxed'>
            <div className='max-w-3xl'>

              {/* <h1 className='font-semibold text-5xl leading-tight tracking-tight'>Smooth, scroll based flipbooks for modern reading</h1> */}
              <h1 className="text-6xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
                PDFs that feel
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  natural to read
                </span>
              </h1>
              <p className="text-xl text-zinc-600 max-w-2xl mb-8">
                Convert your PDFs into beautiful, interactive flipbooks
              </p>
              <div className="flex items-center justify-start gap-8 mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Mouse className="w-5 h-5 text-blue-600" />
                  <span className="text-base">Smooth scroll-based flipping</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <Zap className="w-5 h-5 text-violet-600" />
                  <span className="text-base">Lightweight and fast</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="text-base">Self-hostable &amp; cloud-enabled</span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-4">
                <Link href="/signup" className="bg-zinc-900 text-white px-8 py-4 rounded-md">
                  Try it now
                </Link>
                <a href="#demo" className="border-zinc-300 text-zinc-900 px-8 py-4 rounded-md bg-zinc-100">
                  View demo
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="container--boxed pb-30" id='demo'>
          <div>
            <div className='text-zinc-500 mb-3 text-sm'>Try scrolling through this flipbook</div>

            <FlipbookIframe
              src="/flipbook/demo-ikea"
              title="IKEA Flipbook"
              style={{ height: '80vh' }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-30 bg-zinc-50">
          <div className="container--boxed">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div

                className="bg-white p-8 rounded-xl border border-zinc-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  Smooth scroll flipping
                </h3>
                <p className="text-zinc-600">
                  Intuitive page turning that feels natural on digital devices. No clunky animations.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-zinc-200"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  Lightning fast
                </h3>
                <p className="text-zinc-600">
                  Lightweight viewer that only loads what's necessary. High page speeds guaranteed.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-zinc-200"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Maximize2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  Lightbox zoom
                </h3>
                <p className="text-zinc-600">
                  Click any page to view it in full detail. Perfect for fine print and diagrams.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-zinc-200"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  Self-hostable
                </h3>
                <p className="text-zinc-600">
                  Keep full control of your data. Host flipbooks on your own infrastructure.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-zinc-200"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  Cloud enabled
                </h3>
                <p className="text-zinc-600">
                  Or use our cloud service. Deploy flipbooks instantly without server setup.
                </p>
              </div>

              <div
                className="bg-gradient-to-br from-zinc-900 to-zinc-700 p-8 rounded-xl text-white"
              >
                <div className="text-3xl font-bold mb-2">Try it</div>
                <p className="text-zinc-300 mb-6">
                  Experience the difference. Scroll through the demos above.
                </p>
                <Link href="/signup" className="bg-white text-zinc-900 hover:bg-zinc-100 px-4 py-2 rounded-md inline-block">
                  Get early access
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='py-30'>

          <div className='container--boxed'>
            <div

              className=" mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Built for digital devices
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl">
                Traditional page flips feel unnatural on screens. Our scroll-based approach feels intuitive and fast.
              </p>
            </div>

            <div className='text-zinc-500 mb-3 text-sm'>Try scrolling through this flipbook</div>
            <FlipbookIframe
              src="/flipbook/demo-tesla"
              title="Tesla Flipbook"
              style={{ height: '80vh' }}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-zinc-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div

            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to transform your PDFs?
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Get early access to beta.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/signup" className="bg-white text-zinc-900 hover:bg-zinc-100 px-8 py-4 rounded-md">
                  Start for free
                </Link>
                {/* <a href="#" className="border-white/20 text-white hover:bg-white/10">
                  Contact sales
                </a> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-zinc-200">
        <div className="container--boxed mx-auto text-center text-zinc-600">
          <p className="mb-2">© {new Date().getFullYear()} Flipry. All rights reserved.</p>
          <p className="text-sm">Currently in beta • Self-hostable & cloud-enabled</p>
        </div>
      </footer>
    </div>
  );
}
