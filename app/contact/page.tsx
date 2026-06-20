export const metadata = {
  title: 'Apply for a Project | HalftoneMotion',
  description: 'Apply for a custom motion design project with HalftoneMotion.',
};

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="bg-apple-card rounded-2xl shadow-xl border border-apple-border w-full max-w-lg flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-apple-border text-center">
          <h1 className="text-2xl font-bold text-apple-text tracking-tight">Apply for a Project</h1>
        </div>

        {/* Form Body */}
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

          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-sm font-bold text-apple-text">
              Budget <span className="text-apple-blue">*</span>
            </label>
            <select 
              id="budget"
              name="budget"
              required
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all bg-transparent text-apple-text appearance-none"
            >
              <option className="bg-apple-card text-apple-text" value="" disabled>Select...</option>
              <option className="bg-apple-card text-apple-text" value="< $200">&lt; $200</option>
              <option className="bg-apple-card text-apple-text" value="$200 - $500">$200 - $500</option>
              <option className="bg-apple-card text-apple-text" value="$500 - $800">$500 - $800</option>
              <option className="bg-apple-card text-apple-text" value="$800 - $1500">$800 - $1500</option>
              <option className="bg-apple-card text-apple-text" value="$1500 - $3000">$1500 - $3000</option>
              <option className="bg-apple-card text-apple-text" value="$3000+">$3000+</option>
            </select>
            
            <div className="mt-2 text-[13px] text-zinc-500 leading-relaxed space-y-4">
              <p>Qualified projects will be directed to our scheduling page. Please use the same email to ensure seamless communication.</p>
            </div>
          </div>

          <button 
            type="submit"
            className="mt-2 w-full bg-apple-blue text-white font-bold py-3.5 rounded-xl hover:bg-apple-blue-hover transition-colors shadow-sm active:scale-[0.98]"
          >
            Apply for a Project
          </button>
        </form>
      </div>
    </div>
  );
}
