'use client';

import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function ApproachPage() {
  const approaches = [
    {
      number: '01',
      title: 'Talent Discovery',
      description:
        'We believe everyone has unique talents. Through assessments, workshops, and mentorship, we help young people identify their strengths and passions.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Skills Development',
      description:
        'We provide targeted training in technical, entrepreneurial, and soft skills to prepare youth for success in education and employment.',
      icon: '📚',
    },
    {
      number: '03',
      title: 'Peace Promotion',
      description:
        'Through intercultural dialogue, community service, and shared learning experiences, we foster understanding and unity among youth from diverse backgrounds.',
      icon: '🕊️',
    },
    {
      number: '04',
      title: 'Community Impact',
      description:
        'We encourage youth to apply their talents and skills to address local challenges and contribute positively to their communities.',
      icon: '🌍',
    },
  ];

  const principles = [
    'Youth-Centered: Everything we do is designed with young people at the center',
    'Inclusive: We welcome all youth regardless of background, gender, or ability',
    'Evidence-Based: Our programmes are grounded in research and data',
    'Sustainable: We build long-term partnerships and capacity',
    'Locally-Led: We work with and through local communities',
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-cyan to-iteka-green flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Approach</h1>
            <p className="text-xl opacity-90">How we empower youth in Rwanda</p>
          </div>
        </section>

        {/* Core Approach */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center">Our Four Pillars</h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              Everything we do is built on these four interconnected pillars that work together to
              transform young lives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {approaches.map((approach: any) => (
                <div key={approach.number} className="group">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-5xl font-bold text-iteka-orange opacity-20 group-hover:opacity-100 transition">
                        {approach.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-4xl mb-2">{approach.icon}</div>
                      <h3 className="text-2xl font-bold mb-3 text-iteka-dark group-hover:text-iteka-orange transition">
                        {approach.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{approach.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Core Principles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {principles.map((principle, idx) => (
                <div key={idx} className="flex items-start space-x-4 bg-white p-6 rounded-lg">
                  <div className="text-iteka-orange text-2xl flex-shrink-0">✓</div>
                  <p className="text-gray-700 font-semibold">{principle}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border-l-4 border-iteka-orange p-8 rounded">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "Our approach is rooted in the belief that young people are not problems to be solved,
                but assets to be developed. When given the right opportunities, support, and platform,
                young people can and will transform their communities."
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Methodology</h2>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Assessment */}
              <div className="flex gap-8 items-start">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Assessment & Identification</h3>
                  <p className="text-gray-700">
                    We conduct comprehensive assessments to understand each youth's strengths, interests,
                    and potential challenges.
                  </p>
                </div>
              </div>

              {/* Personalized Programs */}
              <div className="flex gap-8 items-start">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Personalized Programmes</h3>
                  <p className="text-gray-700">
                    Based on assessments, we design customized learning paths that match individual needs
                    and goals.
                  </p>
                </div>
              </div>

              {/* Mentorship & Support */}
              <div className="flex gap-8 items-start">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Mentorship & Support</h3>
                  <p className="text-gray-700">
                    Each participant is paired with mentors and support networks to guide them through
                    their journey.
                  </p>
                </div>
              </div>

              {/* Application & Impact */}
              <div className="flex gap-8 items-start">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Application & Impact</h3>
                  <p className="text-gray-700">
                    We facilitate opportunities for youth to apply what they've learned and make a
                    tangible difference in their communities.
                  </p>
                </div>
              </div>

              {/* Evaluation */}
              <div className="flex gap-8 items-start">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Continuous Evaluation</h3>
                  <p className="text-gray-700">
                    We continuously monitor, evaluate, and refine our programmes based on feedback and
                    evidence of impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Partnership-Driven</h2>
            <p className="text-lg text-gray-700 mb-8">
              We believe in the power of collaboration. Our approach is strengthened through partnerships
              with government, NGOs, private sector, educational institutions, and community organizations.
            </p>
            <div className="bg-white border-l-4 border-iteka-orange p-8 rounded">
              <p className="text-gray-700 leading-relaxed">
                Together, we create an ecosystem where young people can discover their talents, develop
                critical skills, and become agents of positive change in their communities and beyond.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}