'use client';

import { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Heart, Shield, FileCheck, DollarSign, CheckCircle, HelpCircle } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import styles from './Donate.module.css';
import shared from '@/src/styles/shared.module.css';

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
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Donation Amount */}
        <div>
          <label className={styles.fieldLabel}>Select Amount (USD)</label>
          <div className={styles.amountGrid}>
            {presetAmounts.map((amnt) => (
                <button
                    key={amnt}
                    type="button"
                    onClick={() => {
                      setAmount(amnt);
                      setCustomAmount('');
                    }}
                    className={`${styles.amountButton} ${amount === amnt && !customAmount ? styles.amountButtonActive : ''}`}
                >
                  ${amnt}
                </button>
            ))}
          </div>
          <div>
            <label className={styles.fieldLabelSm}>Custom Amount</label>
            <div className={styles.customAmountWrap}>
              <div className={styles.customAmountIcon}>
                <DollarSign size={20} />
              </div>
              <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  step="0.01"
                  min="1"
                  className={`${styles.textInput} ${styles.textInputIndent}`}
              />
            </div>
          </div>
        </div>

        {/* Donor Info */}
        <div className={styles.donorFields}>
          <div>
            <label className={styles.fieldLabelSm}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Your name"
                className={styles.textInput}
            />
          </div>

          <div>
            <label className={styles.fieldLabelSm}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
                className={styles.textInput}
            />
          </div>
        </div>

        {/* Card Element */}
        <div>
          <label className={styles.fieldLabelSm}>
            Card Details <span className={styles.required}>*</span>
          </label>
          <div className={styles.cardElementWrap}>
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
            <div className={`${styles.messageBox} ${message.includes('✓') ? styles.messageSuccess : styles.messageError}`}>
              {message}
            </div>
        )}

        {/* Submit Button */}
        <button type="submit" disabled={!stripe || loading} className={styles.submitButton}>
          {loading ? (
              <>
                <div className={styles.spinnerSm}></div>
                Processing...
              </>
          ) : (
              <>
                <Heart size={20} />
                Donate ${finalAmount || amount}
              </>
          )}
        </button>

        <p className={styles.secureNote}>
          <Shield size={16} />
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
        {/* Hero */}
        <section className={shared.pageHero}>
          <div className={shared.pageHeroInner}>
            <div className={styles.heroIcon}>
              <Heart size={28} />
            </div>
            <h1 className={shared.pageHeroTitle}>Support Our Mission</h1>
            <p className={shared.pageHeroText}>
              Help us empower young people in Rwanda through talent discovery, skills development,
              and peace promotion
            </p>
          </div>
        </section>

        {/* Main Donate Section */}
        <section className={styles.mainSection}>
          <div className={shared.container}>
            <div className={styles.mainGrid}>
              {/* Info */}
              <div className={styles.infoCol}>
                <div>
                  <h2 className={styles.infoTitle}>Make a Difference</h2>
                  <p className={styles.infoText}>
                    Your donation directly supports our programmes that empower young people in Rwanda
                    through talent discovery, skills development, and peace promotion.
                  </p>
                </div>

                {/* Benefits */}
                <div className={styles.benefitsList}>
                  {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                        <div key={idx} className={styles.benefitItem}>
                          <div className={styles.benefitIconCircle}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                            <p className={styles.benefitText}>{benefit.description}</p>
                          </div>
                        </div>
                    );
                  })}
                </div>

                {/* Impact Box */}
                <div className={styles.impactBox}>
                  <p className={styles.impactLabel}>
                    <DollarSign size={20} />
                    Your Impact:
                  </p>
                  <ul className={styles.impactList}>
                    {impactItems.map((item, idx) => (
                        <li key={idx} className={styles.impactItem}>
                          <span className={styles.impactAmount}>{item.amount}</span>
                          <span className={styles.impactText}>{item.impact}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div>
                <div className={styles.formCard}>
                  <h3 className={styles.formTitle}>Donation Details</h3>
                  <Elements stripe={stripePromise}>
                    <DonateForm />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.faqInner}>
            <div className={styles.faqHeader}>
              <div className={styles.faqIconCircle}>
                <HelpCircle size={24} />
              </div>
              <h2 className={shared.sectionTitleCenter}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <h4 className={styles.faqQuestion}>{faq.question}</h4>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
              ))}
            </div>

            <div className={styles.faqCta}>
              <p className={styles.faqCtaText}>Have more questions?</p>
              <a href="/contact" className={shared.btnPrimary}>Contact Us</a>
            </div>
          </div>
        </section>
      </main>

  <Footer />
</>
);
}
