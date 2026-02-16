'use client';

import { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Heart, Shield, FileCheck, DollarSign, CheckCircle, HelpCircle } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

function DonateForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const presetAmounts = ['10', '25', '50', '100', '250'];
  const finalAmount = customAmount ? customAmount : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(parseFloat(finalAmount) * 100),
          name: formData.name,
          email: formData.email,
        }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        window.location.href = '/donate/success';
      }
    } catch (error) {
      setMessage('Error processing payment. Please try again.');
    }

    setLoading(false);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Select Amount (USD)</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {presetAmounts.map((amnt) => (
                <button
                    key={amnt}
                    type="button"
                    onClick={() => {
                      setAmount(amnt);
                      setCustomAmount('');
                    }}
                    className={`py-4 rounded-lg font-semibold transition ${
                        amount === amnt && !customAmount
                            ? 'bg-iteka-orange text-white shadow-md'
                            : 'bg-white border-2 border-gray-200 text-gray-800 hover:border-iteka-orange'
                    }`}
                >
                  ${amnt}
                </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  step="0.01"
                  min="1"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Donor Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Details <span className="text-red-500">*</span>
          </label>
          <div className="px-4 py-4 border-2 border-gray-200 rounded-lg">
            <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424242',
                      '::placeholder': {
                        color: '#9CA3AF',
                      },
                    },
                  },
                }}
            />
          </div>
        </div>

        {/* Message */}
        {message && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
                message.includes('✓')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
        )}

        {/* Submit Button */}
        <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-iteka-orange text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
          ) : (
              <>
                <Heart className="w-5 h-5" />
                Donate ${finalAmount || amount}
              </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Your donation is secure and encrypted. We never store your card information.
        </p>
      </form>
  );
}

export default function DonatePage() {
  const impactItems = [
    { amount: '$10', impact: 'Supports one youth workshop session' },
    { amount: '$50', impact: 'Provides skills training materials for a group' },
    { amount: '$100', impact: 'Sponsors a complete programme module' },
    { amount: '$250+', impact: 'Receives special recognition and impact reports' },
  ];

  const benefits = [
    {
      icon: Shield,
      title: '100% Transparent',
      description: 'Know exactly where your funds go with detailed impact reports',
    },
    {
      icon: FileCheck,
      title: 'Tax Deductible',
      description: 'Get a receipt for your donation for tax purposes',
    },
    {
      icon: CheckCircle,
      title: 'Secure Payment',
      description: 'Your information is encrypted and protected',
    },
  ];

  const faqs = [
    {
      question: 'Is my donation secure?',
      answer: 'Yes! We use Stripe, a trusted payment processor used by millions. Your card information is encrypted and never stored on our servers.',
    },
    {
      question: 'Can I set up a recurring donation?',
      answer: 'Currently we only accept one-time donations. Contact us at hello@itekarwanda.org to arrange recurring donations.',
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Donations to Iteka Youth Organization are tax-deductible. You\'ll receive a receipt for your records.',
    },
    {
      question: 'How can I track my donation impact?',
      answer: 'Donors receive regular updates about programme outcomes and impact. We\'ll send you detailed reports on how your contribution made a difference.',
    },
  ];

  return (
      <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-iteka-dark" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
              Support Our Mission
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Help us empower young people in Rwanda through talent discovery, skills development,
              and peace promotion
            </p>
          </div>
        </section>

        {/* Main Donate Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info - 2 colonnes */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-iteka-dark mb-6">Make a Difference</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your donation directly supports our programmes that empower young people in Rwanda
                    through talent discovery, skills development, and peace promotion.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                        <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-iteka-dark" />
                          </div>
                          <div>
                            <h4 className="font-bold text-iteka-dark mb-1">{benefit.title}</h4>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                          </div>
                        </div>
                    );
                  })}
                </div>

                {/* Impact Box */}
                <div className="bg-gradient-to-br from-iteka-orange to-orange-600 p-6 rounded-lg text-white">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Your Impact:
                  </p>
                  <ul className="space-y-2">
                    {impactItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="font-bold">{item.amount}</span>
                          <span className="opacity-90">{item.impact}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form - 3 colonnes */}
              <div className="lg:col-span-3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-iteka-dark mb-6">Donation Details</h3>
                  <Elements stripe={stripePromise}>
                    <DonateForm />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-iteka-dark" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-iteka-dark mb-2">{faq.question}</h4>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Have more questions?</p>
              <a
                href="/contact"
                className="inline-block bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      </main>

  <Footer />
</>
);
}