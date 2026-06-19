export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-neutral-dark">Terms of Service</h1>

        <div className="space-y-8 text-lg text-neutral-gray">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">1. Agreement to Terms</h2>
            <p>
              By accessing and using Eximly, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials
              (information or software) on Eximly for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on Eximly</li>
              <li>Remove or obscure any copyright or other proprietary notices</li>
              <li>Transfer the materials to another person or "mirror" the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">3. Disclaimer</h2>
            <p>
              The materials on Eximly are provided on an 'as is' basis. Eximly makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">4. Limitations</h2>
            <p>
              In no event shall Eximly or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Eximly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Eximly could include technical, typographical, or photographic errors.
              Eximly does not warrant that any of the materials on the website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">6. Modifications</h2>
            <p>
              Eximly may revise these terms of service at any time without notice.
              By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-dark">7. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br/>
              Email: legal@eximly.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
