"use client";

export default function ContactForm() {
  const budgets = ["$200 - $500", "$500 - $800", "$800 - $1500", "$1500 - $3000", "$3000+"];

  return (
    <form 
      action="https://formsubmit.co/atharvasharma1002006@gmail.com" 
      method="POST"
      className="p-6 flex flex-col gap-6"
    >
      {/* FormSubmit Config */}
      <input type="hidden" name="_subject" value="New Project Application!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://halftonemotion.vercel.app/" />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold text-apple-text">
          Full Name <span className="text-apple-blue">*</span>
        </label>
        <input 
          type="text" 
          id="name"
          name="name"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold text-apple-text">
          Email <span className="text-apple-blue">*</span>
        </label>
        <input 
          type="email" 
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all placeholder:text-zinc-400 bg-transparent text-apple-text"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-apple-text">
          Budget <span className="text-apple-blue">*</span>
        </label>
        
        {/* Apple UI Inspired Segmented Control Grid */}
        <div className="grid grid-cols-2 gap-3">
          {budgets.map(b => (
            <label key={b} className="relative cursor-pointer group">
              <input type="radio" name="budget" value={b} className="peer sr-only" required />
              <div className="rounded-xl border border-apple-border px-4 py-3 text-center transition-all peer-checked:border-apple-blue peer-checked:bg-apple-blue/10 peer-checked:text-apple-blue group-hover:border-apple-gray text-apple-text text-sm font-medium shadow-sm peer-checked:shadow-apple-blue/20">
                {b}
              </div>
            </label>
          ))}
        </div>
        
        <div className="mt-2 text-[13px] text-zinc-500 leading-relaxed space-y-4">
          <p>Qualified projects will be directed to our scheduling page. Please use the same email to ensure seamless communication.</p>
        </div>
      </div>

      <button 
        type="submit"
        className="mt-4 w-full bg-apple-blue text-white font-bold py-3.5 rounded-xl hover:bg-apple-blue-hover transition-colors shadow-sm active:scale-[0.98]"
      >
        Apply for a Project
      </button>
    </form>
  );
}
