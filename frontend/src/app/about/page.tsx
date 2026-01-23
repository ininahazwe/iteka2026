'use client';

import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-dark to-iteka-brown flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">About Iteka</h1>
            <p className="text-xl opacity-90">Empowering the next generation of leaders in Rwanda</p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Mission */}
              <div className="text-center">
                <div className="bg-iteka-orange text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower young people in Rwanda through talent discovery, skills development, and
                  peace promotion, enabling them to become leaders and agents of positive change in their
                  communities.
                </p>
              </div>

              {/* Vision */}
              <div className="text-center">
                <div className="bg-iteka-orange text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  A Rwanda where every young person has the opportunity to discover their talents,
                  develop their skills, and contribute to building a peaceful, prosperous, and inclusive
                  society.
                </p>
              </div>

              {/* Values */}
              <div className="text-center">
                <div className="bg-iteka-orange text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Values</h3>
                <p className="text-gray-700 leading-relaxed">
                  Inclusivity, Excellence, Integrity, Innovation, and Peace. We believe in the power of
                  youth and are committed to creating an environment where every young person can thrive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                Iteka Youth Organization was founded with a simple but powerful belief: every young
                person in Rwanda has untapped potential waiting to be discovered and developed.
              </p>
              <p>
                We recognized that while Rwanda has an incredibly talented youth population, many young
                people lack access to platforms and resources to discover their talents and develop
                critical skills for the future. We also saw the need for initiatives that promote peace,
                unity, and understanding among youth from diverse backgrounds.
              </p>
              <p>
                Iteka was born out of this need. The word "Iteka" itself means "decree" or "law" in
                Kinyarwanda, representing our commitment to making youth empowerment a priority and a
                right for all young people in Rwanda.
              </p>
              <p>
                Today, through our carefully designed programmes and partnerships, we continue to
                discover new talent, build essential skills, and foster peace among the next generation
                of Rwandan leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-iteka-orange mb-2">2500+</div>
                <p className="text-gray-600">Youth Empowered</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-iteka-orange mb-2">12+</div>
                <p className="text-gray-600">Active Programmes</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-iteka-orange mb-2">15+</div>
                <p className="text-gray-600">Partner Organizations</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-iteka-orange mb-2">50+</div>
                <p className="text-gray-600">Team Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-iteka-orange text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Involved?</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether as a participant, partner, or supporter, there are many ways to be part of our mission.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/programmes"
                className="bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
              >
                Explore Programmes
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-iteka-orange transition"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}