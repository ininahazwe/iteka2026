'use client';

import { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
      // Call your backend to create payment intent
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
        setMessage('✓ Thank you for your donation!');
        setFormData({ name: '', email: '' });
        setAmount('50');
        setCustomAmount('');
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
        <label className="block text-sm font-semibold mb-4">Select Amount (USD)</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {presetAmounts.map((amnt: any) => (
            <button
              key={amnt}
              type="button"
              onClick={() => {
                setAmount(amnt);
                setCustomAmount('');
              }}
              className={`py-3 rounded font-semibold transition ${
                amount === amnt && !customAmount
                  ? 'bg-iteka-orange text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              ${amnt}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Custom Amount</label>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              step="0.01"
              min="1"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
            />
          </div>
        </div>
      </div>

      {/* Donor Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
          />
        </div>
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-semibold mb-2">Card Details *</label>
        <div className="px-4 py-3 border border-gray-300 rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424242',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded ${
            message.startsWith('✓')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-iteka-orange text-white py-3 rounded font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Donate $${finalAmount || amount}`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your donation is secure and encrypted. We never store your card information.
      </p>
    </form>
  );
}

export default function DonatePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-green to-iteka-cyan flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl opacity-90">Help us empower youth in Rwanda</p>
          </div>
        </section>

        {/* Donate Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Make a Difference</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Your donation directly supports our programmes that empower young people in Rwanda
                  through talent discovery, skills development, and peace promotion.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-iteka-orange text-2xl">✓</div>
                    <div>
                      <h4 className="font-bold mb-1">100% Transparent</h4>
                      <p className="text-gray-600 text-sm">Know exactly where your funds go</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-iteka-orange text-2xl">✓</div>
                    <div>
                      <h4 className="font-bold mb-1">Tax Deductible</h4>
                      <p className="text-gray-600 text-sm">Get a receipt for your donation</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-iteka-orange text-2xl">✓</div>
                    <div>
                      <h4 className="font-bold mb-1">Secure Payment</h4>
                      <p className="text-gray-600 text-sm">Your information is always protected</p>
                    </div>
                  </div>
                </div>

                <div className="bg-iteka-orange bg-opacity-10 border-l-4 border-iteka-orange p-6 rounded">
                  <p className="text-iteka-dark font-semibold mb-2">Your Impact:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• $10 supports one youth workshop session</li>
                    <li>• $50 provides skills training materials</li>
                    <li>• $100 sponsors a complete programme module</li>
                    <li>• $250+ receives special recognition</li>
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <Elements stripe={stripePromise}>
                  <DonateForm />
                </Elements>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">Is my donation secure?</h4>
                <p className="text-gray-700">
                  Yes! We use Stripe, a trusted payment processor used by millions. Your card information
                  is encrypted and never stored on our servers.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Can I set up a recurring donation?</h4>
                <p className="text-gray-700">
                  Currently we only accept one-time donations. Contact us at hello@itekarwanda.org to
                  arrange recurring donations.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Are donations tax-deductible?</h4>
                <p className="text-gray-700">
                  Donations to Iteka Youth Organization are tax-deductible. You'll receive a receipt
                  for your records.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">How can I track my donation impact?</h4>
                <p className="text-gray-700">
                  Donors receive regular updates about programme outcomes and impact. We'll send you
                  detailed reports on how your contribution made a difference.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}