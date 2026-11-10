import { useState } from "react";
import actions from "./EditorialAction.module.css";
import styles from "./FullPageSlides.module.css";
import { motion, useReducedMotion } from "motion/react";

const labelClass = "mb-2 block text-sm text-[var(--site-text)]";
const fieldClass = "w-full rounded-lg border border-[var(--site-frame)] bg-[var(--site-surface)] p-3 text-sm text-[var(--site-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent)]";

const Contact = () => {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    formData.append("access_key", "b8504469-d018-435f-aca3-c58ef62a9078");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-24"
    >
      <motion.h2
        initial={reduced ? false : { y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className={styles.sectionTitle}
      >
        Get in touch
      </motion.h2>

      <motion.form
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.45 }}
        onSubmit={onSubmit}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
          <div>
            <label htmlFor="contact-name" className={labelClass}>Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="contact-message" className={labelClass}>Message</label>
          <textarea id="contact-message" name="message" rows="6" required className={fieldClass} />
        </div>

        <div className="text-center">
          <button type="submit" className={actions.outline} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
          </button>
        </div>

        <p role="status" className="mt-4 min-h-5 text-center text-sm text-[var(--site-text-muted)] font-PlusJakarta">
          {status === "sending" && "Sending your message…"}
          {status === "success" && "Message sent. Thanks for reaching out!"}
          {status === "error" && "Your message couldn’t be sent. Please try again."}
        </p>
      </motion.form>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-white/40 font-PlusJakarta">
        Or connect with me on{' '}
        <a
          href="https://www.linkedin.com/in/norahz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand dark:text-brand hover:underline font-medium"
        >
          LinkedIn
        </a>
      </p>
    </motion.div>
  );
};

export default Contact;
