'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen, Heart, Target, Users, Award, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import { fetchGalleryImages } from '@/src/lib/api';

export default function ApproachPage() {
  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const approaches = [
    {
      number: '01',
      title: 'Talent Discovery',
      description:
          'We believe everyone has unique talents. Through assessments, workshops, and mentorship, we help young people identify their strengths and passions.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Skills Development',
      description:
          'We provide targeted training in technical, entrepreneurial, and soft skills to prepare youth for success in education and employment.',
      icon: BookOpen,
    },
    {
      number: '03',
      title: 'Peace Promotion',
      description:
          'Through intercultural dialogue, community service, and shared learning experiences, we foster understanding and unity among youth from diverse backgrounds.',
      icon: Heart,
    },
    {
      number: '04',
      title: 'Community Impact',
      description:
          'We encourage youth to apply their talents and skills to address local challenges and contribute positively to their communities.',
      icon: Globe,
    },
  ];

  const principles = [
    {
      title: 'Youth-Centered',
      description: 'Everything we do is designed with young people at the center',
    },
    {
      title: 'Inclusive',
      description: 'We welcome all youth regardless of background, gender, or ability',
    },
    {
      title: 'Evidence-Based',
      description: 'Our programmes are grounded in research and data',
    },
    {
      title: 'Sustainable',
      description: 'We build long-term partnerships and capacity',
    },
    {
      title: 'Locally-Led',
      description: 'We work with and through local communities',
    },
    {
      title: 'Impact-Focused',
      description: 'We measure and optimize for tangible community transformation',
    },
  ];

  const methodology = [
    {
      step: '1',
      title: 'Assessment & Identification',
      description: 'We conduct comprehensive assessments to understand each youth\'s strengths, interests, and potential challenges.',
    },
    {
      step: '2',
      title: 'Personalized Programmes',
      description: 'Based on assessments, we design customized learning paths that match individual needs and goals.',
    },
    {
      step: '3',
      title: 'Mentorship & Support',
      description: 'Each participant is paired with mentors and support networks to guide them through their journey.',
    },
    {
      step: '4',
      title: 'Application & Impact',
      description: 'We facilitate opportunities for youth to apply what they\'ve learned and make a tangible difference in their communities.',
    },
    {
      step: '5',
      title: 'Continuous Evaluation',
      description: 'We continuously monitor, evaluate, and refine our programmes based on feedback and evidence of impact.',
    },
  ];

  return (
      <>
        <Header />

        <main>
          {/* Hero Section - Simple */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                Evidence-Based Empowerment.
                <br />
                <span className="text-iteka-orange">Lasting Impact.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our approach combines proven methodologies with local insights to create sustainable
                pathways for youth development across Rwanda.
              </p>
            </div>
          </section>

          {/* Core Approach - Cards avec fond vert */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-iteka-dark">
                Our Four Pillars
              </h2>
              <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                Everything we do is built on these four interconnected pillars that work together to
                transform young lives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approaches.map((approach) => {
                  const Icon = approach.icon;
                  return (
                      <div key={approach.number} className="bg-[#E8F5E9] p-8 rounded-lg group hover:shadow-lg transition">
                        <div className="flex items-start gap-6">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-iteka-orange transition">
                            <Icon className="w-6 h-6 text-iteka-dark group-hover:text-white transition" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-iteka-orange mb-2">{approach.number}</div>
                            <h3 className="text-xl font-bold mb-3 text-iteka-dark">
                              {approach.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{approach.description}</p>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Approach Image + Text Grid */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-64 rounded-lg overflow-hidden">
                    {galleryImages[7]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[7].image.data.url}`}
                            alt="Our Approach"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="h-64 rounded-lg overflow-hidden mt-8">
                    {galleryImages[8]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[8].image.data.url}`}
                            alt="Our Approach"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                    A Holistic Framework
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our approach is rooted in the belief that young people are not problems to be solved,
                    but assets to be developed. When given the right opportunities, support, and platform,
                    young people can and will transform their communities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We combine rigorous assessment, personalized programming, continuous mentorship, and
                    real-world application to ensure sustainable impact. Every programme is designed to be
                    youth-centered, inclusive, and evidence-based.
                  </p>
                  <Link
                      href="/programmes"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    See Our Programmes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Core Principles - Grid */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-iteka-dark">
                Our Core Principles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principles.map((principle, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-iteka-orange transition">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-iteka-dark" />
                        </div>
                        <div>
                          <h3 className="font-bold text-iteka-dark mb-1">{principle.title}</h3>
                          <p className="text-sm text-gray-600">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Methodology - Timeline style */}
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-iteka-dark">
                Our Methodology
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                A proven 5-step process that transforms potential into impact
              </p>

              <div className="space-y-8">
                {methodology.map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                      <div className="w-16 h-16 rounded-full bg-iteka-orange text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold group-hover:scale-110 transition">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-xl font-bold mb-2 text-iteka-dark group-hover:text-iteka-orange transition">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnerships - Fond vert */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-iteka-dark" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-iteka-dark">
                Partnership-Driven Approach
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                We believe in the power of collaboration. Our approach is strengthened through partnerships
                with government, NGOs, private sector, educational institutions, and community organizations.
              </p>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Together, we create an ecosystem where young people can discover their talents, develop
                critical skills, and become agents of positive change in their communities and beyond.
              </p>
              <div className="mt-8">
                <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 border-2 border-iteka-dark px-6 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                >
                  Meet Our Partners
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Results Focus */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                    Measured For Impact
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Every programme we run is designed with clear, measurable outcomes. We track participant
                    progress, skill development, and community impact to ensure our approach delivers real results.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Quarterly assessments</strong> to track individual growth and programme effectiveness
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Community feedback loops</strong> to ensure relevance and local ownership
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Long-term tracking</strong> of participant outcomes and community transformation
                    </span>
                    </li>
                  </ul>
                  <Link
                      href="/impact"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    See Our Impact
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Image */}
                <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
                  <div className="h-64 rounded-lg overflow-hidden">
                    {galleryImages[9]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[9].image.data.url}`}
                            alt="Impact"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="h-64 rounded-lg overflow-hidden mt-8">
                    {galleryImages[10]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[10].image.data.url}`}
                            alt="Impact"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Experience Our Approach
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Learn more about how our evidence-based methodology creates lasting change in communities
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/programmes"
                    className="bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
                >
                  Explore Programmes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/contact"
                    className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}