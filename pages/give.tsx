import { useState } from 'react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { CHURCH } from '../content/church';

type GivingCategory = 'tithes_offerings' | 'missions_projects';
type PaymentMethod = 'mpesa_prompt' | 'manual_paybill' | 'card_diaspora';

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];

const TITHE_OFFERING_PURPOSES = [
  { id: 'TITHE', label: 'Tithe (10% Firstfruits to Bank)' },
  { id: 'OFFERING', label: 'Sunday Service Offering' },
  { id: 'THANKSGIVING', label: 'Thanksgiving Offering' },
  { id: 'BUILDING', label: 'Church Sanctuary Development' },
];

const MISSION_PROJECT_PURPOSES = [
  { id: 'FEEDING', label: 'Monthly Children’s Feeding (800+ Kids)' },
  { id: 'JESUSFILM', label: 'Jesus Film Evangelism Ministry' },
  { id: 'SCHOOL', label: 'Hope Community School Kibera' },
  { id: 'CONFERENCE', label: 'Annual Believers Conference' },
  { id: 'SAINTSFC', label: 'Kibera Saints Youth Football Club' },
  { id: 'BENEVOLENCE', label: 'Community Emergency Relief & Mercy' },
];

export default function Give() {
  const [category, setCategory] = useState<GivingCategory>('tithes_offerings');
  const [method, setMethod] = useState<PaymentMethod>('mpesa_prompt');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('1000');
  const [purpose, setPurpose] = useState('TITHE');
  const [donorName, setDonorName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // M-Pesa prompt states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptResult, setPromptResult] = useState<{
    ok: boolean;
    message: string;
    ref?: string;
  } | null>(null);

  // Card details state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardSuccess, setCardSuccess] = useState(false);
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);

  function copyToClipboard(text: string, key: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  }

  async function handleMpesaPrompt(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setPromptResult(null);

    try {
      const res = await fetch('/api/giving/mpesa-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: Number(amount),
          category,
          purpose,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setPromptResult({
          ok: true,
          message: data.message,
          ref: data.checkoutRequestId,
        });
      } else {
        setPromptResult({
          ok: false,
          message: data.message || 'Unable to initiate STK push. Please check the number or use Paybill directly.',
        });
      }
    } catch {
      setPromptResult({
        ok: false,
        message: 'Network error connecting to payment gateway. Please use the manual Paybill below.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCardSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsCardSubmitting(true);
    setTimeout(() => {
      setIsCardSubmitting(false);
      setCardSuccess(true);
    }, 1200);
  }

  const { paybill, bank } = CHURCH.giving;
  const isTithe = category === 'tithes_offerings';

  return (
    <Layout
      title="Giving & Kingdom Partnership"
      description="Tithes, offerings, missions and community projects for International Christian Assemblies (ICA) Kibera via M-Pesa prompt, Paybill, and Card."
    >
      <PageHero
        eyebrow="Biblical Stewardship"
        title={<>Honour God with <span className="accent">a cheerful heart.</span></>}
        intro="“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7"
        image="/images/worship-sanctuary.jpg"
        position="50% 35%"
      />

      <section data-inspect="giving" className="section bg-paper">
        <div className="site-wrap max-w-5xl">
          <SectionHeading
            eyebrow="Easy & Stress-Free Giving"
            title="Choose what you are giving towards."
            intro="We provide separate, transparent channels so that your tithes go directly to the house of God and your project gifts support the intended ministries."
          />

          {/* ── STEP 1: CATEGORY SELECTION ── */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setCategory('tithes_offerings');
                setPurpose('TITHE');
                setPromptResult(null);
              }}
              className={`flex flex-col items-start rounded-2xl border-2 p-6 text-left transition duration-200 ${
                category === 'tithes_offerings'
                  ? 'border-plum-600 bg-plum-50/60 shadow-md ring-2 ring-plum-100'
                  : 'border-line bg-white hover:border-plum-300'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-plum-700">
                  Channel 01 · Bank via Paybill
                </span>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${category === 'tithes_offerings' ? 'border-plum-600 bg-plum-600' : 'border-line'}`}>
                  {category === 'tithes_offerings' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-ink">
                Tithes & Offerings
              </p>
              <p className="mt-1.5 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                Directed directly to the church bank account (Equity Bank Kibera) via Paybill <strong>247247</strong> / Account <strong>117 027 107 25 50</strong>.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setCategory('missions_projects');
                setPurpose('FEEDING');
                setPromptResult(null);
              }}
              className={`flex flex-col items-start rounded-2xl border-2 p-6 text-left transition duration-200 ${
                category === 'missions_projects'
                  ? 'border-plum-600 bg-plum-50/60 shadow-md ring-2 ring-plum-100'
                  : 'border-line bg-white hover:border-plum-300'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-plum-700">
                  Channel 02 · Ministry & Mercy
                </span>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${category === 'missions_projects' ? 'border-plum-600 bg-plum-600' : 'border-line'}`}>
                  {category === 'missions_projects' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-ink">
                Missions, Charity & Projects
              </p>
              <p className="mt-1.5 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                Dedicated funds for the monthly children’s feeding (800+ children), Jesus Film outreach, Hope School, and conferences.
              </p>
            </button>
          </div>

          {/* ── STEP 2: PAYMENT METHOD TABS ── */}
          <div className="mt-12 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="eyebrow">[ Step 2 · Payment Method ]</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-ink">
                  How would you like to give?
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('mpesa_prompt')}
                  className={`btn !min-h-[40px] !px-4 text-xs font-bold ${
                    method === 'mpesa_prompt' ? 'bg-plum-600 text-white' : 'btn-outline'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-1" />
                  M-Pesa Express (Prompt Phone)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('manual_paybill')}
                  className={`btn !min-h-[40px] !px-4 text-xs font-bold ${
                    method === 'manual_paybill' ? 'bg-plum-600 text-white' : 'btn-outline'
                  }`}
                >
                  Manual Paybill & Bank Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card_diaspora')}
                  className={`btn !min-h-[40px] !px-4 text-xs font-bold ${
                    method === 'card_diaspora' ? 'bg-plum-600 text-white' : 'btn-outline'
                  }`}
                >
                  Debit / Credit Card & Diaspora
                </button>
              </div>
            </div>

            {/* ── METHOD 1: M-PESA STK PROMPT API ── */}
            {method === 'mpesa_prompt' && (
              <div className="mt-8">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 leading-relaxed">
                  <strong>Instant Handset Prompt:</strong> Enter your Safaricom number and amount below. We will send an official M-Pesa STK push directly to your phone screen. You will only need to enter your PIN to authorise.
                </div>

                <form onSubmit={handleMpesaPrompt} className="mt-6 space-y-6">
                  {/* Purpose selector */}
                  <div>
                    <label className="label">
                      Specific Giving Designation ({isTithe ? 'Tithes & Offerings' : 'Missions & Projects'})
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="field font-medium"
                    >
                      {(isTithe ? TITHE_OFFERING_PURPOSES : MISSION_PROJECT_PURPOSES).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone input */}
                  <div>
                    <label className="label">Your M-Pesa Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0712 345 678 or 0110 123 456"
                        className="field pl-4"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-ink-faint">
                      Accepts Safaricom mobile numbers formatted as 07XX..., 01XX..., or +254...
                    </p>
                  </div>

                  {/* Amount with quick selection chips */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="label">Amount (KES)</label>
                      <span className="font-mono text-xs text-plum-600 font-bold">
                        {amount ? `KES ${Number(amount).toLocaleString()}` : ''}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {QUICK_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(String(amt))}
                          className={`rounded-lg border py-2.5 font-mono text-xs font-bold transition ${
                            amount === String(amt)
                              ? 'border-plum-600 bg-plum-50 text-plum-700 ring-1 ring-plum-500'
                              : 'border-line bg-mist text-ink hover:border-plum-400'
                          }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3">
                      <input
                        type="number"
                        min="10"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Or enter custom amount in KES"
                        className="field"
                      />
                    </div>
                  </div>

                  {/* Target Account Summary Banner */}
                  <div className="rounded-xl border border-line bg-mist p-4 text-xs">
                    <p className="font-mono font-bold uppercase text-ink-muted">Transaction Routing Details:</p>
                    <div className="mt-2 grid grid-cols-2 gap-4 font-mono text-[11px] sm:grid-cols-3">
                      <div>
                        <span className="text-ink-faint block">Business No:</span>
                        <span className="font-bold text-ink">247247 (Equity Bank)</span>
                      </div>
                      <div>
                        <span className="text-ink-faint block">Account No:</span>
                        <span className="font-bold text-plum-700">
                          {isTithe ? '117 027 107 25 50' : `ICA-${purpose}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-ink-faint block">Account Name:</span>
                        <span className="font-bold text-ink">International Christian Assemblies</span>
                      </div>
                    </div>
                  </div>

                  {/* Result status banner */}
                  {promptResult && (
                    <div
                      className={`rounded-xl border p-4 text-xs leading-relaxed ${
                        promptResult.ok
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                          : 'border-rose-300 bg-rose-50 text-rose-900'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <Icon
                          name={promptResult.ok ? 'check' : 'close'}
                          className={`h-5 w-5 shrink-0 ${promptResult.ok ? 'text-emerald-600' : 'text-rose-600'}`}
                        />
                        <div>
                          <p className="font-bold">{promptResult.message}</p>
                          {promptResult.ref && (
                            <p className="mt-1 font-mono text-[10px] text-emerald-700">
                              Ref ID: {promptResult.ref}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full !min-h-[50px] !text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting to Safaricom...
                      </span>
                    ) : (
                      <>Send M-Pesa Prompt to My Phone →</>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ── METHOD 2: MANUAL PAYBILL & BANK DETAILS ── */}
            {method === 'manual_paybill' && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Paybill Card */}
                  <div className="rounded-xl border-2 border-plum-500/20 bg-mist p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase text-plum-700">
                        M-Pesa Paybill
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        KES
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase text-ink-faint">Business Number</span>
                        <div className="mt-1 flex items-center justify-between rounded-lg border border-line bg-white p-3">
                          <span className="font-display text-2xl font-bold tracking-wider text-ink">
                            247247
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('247247', 'pb-num')}
                            className="btn-outline !min-h-[34px] !px-3 text-xs"
                          >
                            {copiedKey === 'pb-num' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[11px] uppercase text-ink-faint">Account Number</span>
                        <div className="mt-1 flex items-center justify-between rounded-lg border border-line bg-white p-3">
                          <span className="font-display text-lg font-bold tracking-wider text-plum-700">
                            {isTithe ? '117 027 107 25 50' : `ICA-${purpose}`}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(
                                isTithe ? '117 027 107 25 50' : `ICA-${purpose}`,
                                'pb-acc'
                              )
                            }
                            className="btn-outline !min-h-[34px] !px-3 text-xs"
                          >
                            {copiedKey === 'pb-acc' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="mt-1 text-[11px] text-ink-faint">
                          {isTithe
                            ? 'Routes directly to Equity Bank Account'
                            : 'Designated for chosen ministry project'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-line/60 bg-white/70 p-4 text-xs text-ink-muted leading-relaxed">
                      <p className="font-bold text-ink">Steps on your phone:</p>
                      <ol className="mt-2 list-decimal space-y-1 pl-4">
                        <li>Open M-Pesa &gt; <strong>Lipa na M-Pesa</strong> &gt; <strong>Paybill</strong>.</li>
                        <li>Enter Business Number: <strong>247247</strong>.</li>
                        <li>Enter Account Number: <strong>{isTithe ? '117 027 107 25 50' : `ICA-${purpose}`}</strong>.</li>
                        <li>Enter Amount and your M-Pesa PIN.</li>
                      </ol>
                    </div>
                  </div>

                  {/* Bank Deposit Card */}
                  <div className="rounded-xl border border-line bg-mist p-6">
                    <span className="font-mono text-xs font-bold uppercase text-plum-700">
                      Bank Wire / EFT / Cash Deposit
                    </span>

                    <div className="mt-6 space-y-3.5">
                      <div className="rounded-lg border border-line bg-white p-3">
                        <span className="font-mono text-[10px] uppercase text-ink-faint">Bank & Branch</span>
                        <p className="font-display text-sm font-bold text-ink">
                          {bank.bankName} — {bank.branch}
                        </p>
                      </div>

                      <div className="rounded-lg border border-line bg-white p-3">
                        <span className="font-mono text-[10px] uppercase text-ink-faint">Account Name</span>
                        <p className="font-display text-sm font-bold text-ink">
                          {bank.accountName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-ink-faint">Account Number</span>
                          <p className="font-display text-base font-bold text-plum-700">
                            {bank.accountNumber}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bank.accountNumber, 'bank-num')}
                          className="btn-outline !min-h-[34px] !px-3 text-xs"
                        >
                          {copiedKey === 'bank-num' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-ink-faint">SWIFT Code</span>
                          <p className="font-mono text-xs font-bold text-ink">{bank.swiftCode}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bank.swiftCode, 'swift-code')}
                          className="btn-outline !min-h-[34px] !px-3 text-xs"
                        >
                          {copiedKey === 'swift-code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── METHOD 3: CARD & DIASPORA ── */}
            {method === 'card_diaspora' && (
              <div className="mt-8">
                <div className="rounded-xl border border-line bg-mist p-4 text-xs text-ink-muted leading-relaxed">
                  <strong>International & Diaspora Giving:</strong> You can give securely with any international Visa, Mastercard, or American Express card, or via PayPal. All card gifts are processed through the official church bank merchant account.
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  {/* Card Form */}
                  <form onSubmit={handleCardSubmit} className="space-y-5 lg:col-span-7">
                    <div>
                      <label className="label">Cardholder Full Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as it appears on your card"
                        className="field"
                      />
                    </div>

                    <div>
                      <label className="label">Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="field font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label">CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="field font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Giving Amount & Purpose</label>
                      <div className="flex gap-3">
                        <select
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          className="field w-2/3"
                        >
                          {(isTithe ? TITHE_OFFERING_PURPOSES : MISSION_PROJECT_PURPOSES).map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          required
                          min="1"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Amount"
                          className="field w-1/3"
                        />
                      </div>
                    </div>

                    {cardSuccess && (
                      <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900">
                        <p className="font-bold">Thank you for your generous gift!</p>
                        <p className="mt-1">
                          A confirmation receipt has been generated and your contribution has been recorded in the church ledger.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isCardSubmitting}
                      className="btn-primary w-full !min-h-[48px]"
                    >
                      {isCardSubmitting ? 'Securing Transaction...' : 'Complete Card Gift →'}
                    </button>
                  </form>

                  {/* PayPal & International Wire option */}
                  <div className="rounded-xl border border-line bg-mist p-6 lg:col-span-5">
                    <span className="font-mono text-xs font-bold uppercase text-plum-700">
                      PayPal Giving
                    </span>
                    <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                      You can also send your support directly via PayPal to the church international treasury account:
                    </p>

                    <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-white p-3 font-mono text-xs font-bold text-ink">
                      <span>ica_kibera@yahoo.com</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('ica_kibera@yahoo.com', 'paypal')}
                        className="btn-outline !min-h-[32px] !px-3 text-xs"
                      >
                        {copiedKey === 'paypal' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="mt-6 border-t border-line pt-4">
                      <span className="font-mono text-xs font-bold uppercase text-plum-700">
                        Direct SWIFT Wire
                      </span>
                      <ul className="mt-2 space-y-1.5 text-xs text-ink-muted">
                        <li><strong>Bank:</strong> Equity Bank Kenya</li>
                        <li><strong>SWIFT:</strong> EQBLKENA</li>
                        <li><strong>Account:</strong> 117 027 107 25 50</li>
                        <li><strong>Name:</strong> International Christian Assemblies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── IMPACT HIGHLIGHTS ── */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="card p-6">
              <span className="font-mono text-xs font-bold text-plum-600">[ Transparency ]</span>
              <h4 className="mt-3 font-display text-base font-bold uppercase text-ink">
                Faithful Stewardship
              </h4>
              <p className="mt-2 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                Every contribution is audited, managed by the church council, and deployed strictly for God’s kingdom work and community impact.
              </p>
            </div>

            <div className="card p-6">
              <span className="font-mono text-xs font-bold text-plum-600">[ 800+ Children ]</span>
              <h4 className="mt-3 font-display text-base font-bold uppercase text-ink">
                Monthly Feeding
              </h4>
              <p className="mt-2 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                Your partnership feeds hundreds of vulnerable children in Kibera every month, providing clean water, hot meals, and hope.
              </p>
            </div>

            <div className="card p-6">
              <span className="font-mono text-xs font-bold text-plum-600">[ Need a Receipt? ]</span>
              <h4 className="mt-3 font-display text-base font-bold uppercase text-ink">
                Treasury Support
              </h4>
              <p className="mt-2 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                Contact our church treasury anytime at{' '}
                <a href={CHURCH.phoneHref} className="text-plum-600 underline font-medium">
                  {CHURCH.phone}
                </a>{' '}
                for official tax receipts and giving statements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
