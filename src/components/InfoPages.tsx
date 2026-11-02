import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { RouteView, StaticPageContent } from '../types';

interface StaticInfoPageProps {
  content: StaticPageContent;
  onNavigate: (route: RouteView) => void;
}

export const StaticInfoPage: React.FC<StaticInfoPageProps> = ({
  content,
  onNavigate,
}) => {
  return (
    <section className="pt-14 pb-20">
      <div className="max-w-[790px] mx-auto px-6">
        <nav
          aria-label="Breadcrumb"
          className="text-[0.92rem] font-bold text-[#46507a] mb-3 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => onNavigate({ page: 'home' })}
            className="text-[#2447ff] hover:underline cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#0c1233]">{content.title}</span>
        </nav>

        <h1
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-[clamp(2.3rem,4.8vw,3.6rem)] leading-[1.06] text-[#0c1233] mb-3"
        >
          {content.title}
        </h1>
        <p className="text-[1.2rem] text-[#46507a] mb-8">{content.lead}</p>

        <article className="space-y-7">
          {content.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="slg-article-h2 mb-3">{sec.heading}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[#2a3466] text-[1.06rem] leading-[1.78] mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {content.showAuthorBadge && (
            <div className="flex items-center gap-4 bg-[#c9f23f] rounded-[18px] p-5 slg-border slg-shadow mt-8">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-white slg-border grid place-items-center font-display font-extrabold text-[#0c1233] shrink-0"
              >
                SL
              </div>
              <div className="text-[0.98rem] text-[#0c1233]">
                Written and maintained by <strong>The Smart Loans Guide team</strong>.
                Questions? Email{' '}
                <a
                  href="mailto:contact@smartloansguide.com"
                  className="font-extrabold text-[#2447ff] underline"
                >
                  contact@smartloansguide.com
                </a>
                .
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

interface ContactPageProps {
  onNavigate: (route: RouteView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Calculator suggestion');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address so we can reply.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please write a short message (at least 10 characters).');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="pt-14 pb-20">
      <div className="max-w-[790px] mx-auto px-6">
        <nav
          aria-label="Breadcrumb"
          className="text-[0.92rem] font-bold text-[#46507a] mb-3 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => onNavigate({ page: 'home' })}
            className="text-[#2447ff] hover:underline cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#0c1233]">Contact us</span>
        </nav>

        <h1 className="font-display font-extrabold text-[clamp(2.3rem,4.8vw,3.6rem)] leading-[1.06] text-[#0c1233] mb-3">
          Contact us
        </h1>
        <p className="text-[1.2rem] text-[#46507a] mb-8">We read every message.</p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-[22px] p-6 slg-border slg-shadow">
            <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
              Direct email
            </div>
            <h2 className="font-display font-extrabold text-[1.2rem] text-[#0c1233] mt-2 m-0 break-all">
              <a
                href="mailto:contact@smartloansguide.com"
                className="text-[#2447ff] hover:underline"
              >
                contact@smartloansguide.com
              </a>
            </h2>
          </div>

          <div className="bg-white rounded-[22px] p-6 slg-border slg-shadow">
            <div className="text-[0.82rem] font-display font-bold text-[#2447ff]">
              Typical reply time
            </div>
            <h2 className="font-display font-extrabold text-[1.2rem] text-[#0c1233] mt-2 m-0">
              2 to 3 working days
            </h2>
          </div>
        </div>

        {/* Good Reasons to Write */}
        <div className="mb-10">
          <h2 className="slg-article-h2 mb-3">Good reasons to write</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#2a3466] text-[1.05rem]">
            <li>A calculator formula, worked example, or guide looks inaccurate.</li>
            <li>A new loan or budgeting calculator you would like us to build next.</li>
            <li>Privacy enquiries or editorial feedback.</li>
            <li>Media or partnership questions.</li>
          </ul>
          <p className="mt-4 text-[0.96rem] text-[#46507a]">
            Note: Because we are an independent education site and not a regulated
            advisor or lender, we cannot provide personal financial advice, review
            individual loan contracts, or arrange loans by email.
          </p>
        </div>

        {/* Interactive Validated Feedback / Tool Request Form */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 slg-border slg-shadow">
          <h2 className="font-display font-extrabold text-[1.5rem] text-[#0c1233] m-0 mb-2">
            Send a message or suggest a calculator
          </h2>
          <p className="text-[#46507a] text-[0.98rem] mb-6">
            Have an idea for a tool or spotted an edge case? Let our team know below.
          </p>

          {submitted ? (
            <div className="bg-[#c9f23f] rounded-[18px] p-6 slg-border">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#0c1233] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-extrabold text-[1.2rem] text-[#0c1233] m-0 mb-1">
                    Thank you, {name} — message recorded
                  </h3>
                  <p className="text-[#0c1233] text-[0.98rem] mb-4">
                    We have logged your note regarding <strong>{topic}</strong> and will
                    follow up at <strong>{email}</strong> within 2 to 3 working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="slg-btn-sm bg-white text-[#0c1233] px-4 py-2 text-[0.9rem]"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-display font-extrabold text-[0.95rem] text-[#0c1233] mb-1.5"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="slg-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-display font-extrabold text-[0.95rem] text-[#0c1233] mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="slg-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="block font-display font-extrabold text-[0.95rem] text-[#0c1233] mb-1.5"
                >
                  Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="slg-input cursor-pointer"
                >
                  <option value="Calculator suggestion">Suggest a new calculator</option>
                  <option value="Report a calculation issue">
                    Report a calculation or typo
                  </option>
                  <option value="Guide question">Question about a guide</option>
                  <option value="General enquiry">General enquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-msg"
                  className="block font-display font-extrabold text-[0.95rem] text-[#0c1233] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are calculating or what we can improve..."
                  className="slg-input resize-y"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="bg-[#ff7a2f] text-[#0c1233] font-extrabold rounded-xl px-4 py-2.5 text-[0.92rem]"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="slg-btn bg-[#c9f23f] text-[#0c1233] px-6 py-3.5 text-[1rem] whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
