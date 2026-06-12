import TopDrawing from "@/assets/drawing-coils.svg?react";

import { Section } from "../../Section";

export default function RegulationSection() {



  return (
    <Section className="relative overflow-clip">
         <TopDrawing
      className="absolute right-0 top-0 w-full z-1  text-primary/50"
      style={{ '--svg-stroke': 'var(--background)' } as any}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-base font-medium text-white mb-4">Registration</h3>
          <ol className="list-decimal list-outside pl-5 space-y-3 text-sm text-slate-400 leading-relaxed">
            <li>Business Names in accordance with the Registration of Business Names Act, 1962 (Act 151)</li>
            <li>Companies in accordance with the Companies Act, 2019 (Act 992) and the companies Regulation 2023 (LI 2473)</li>
            <li>Partnerships in accordance with the Incorporated Private Partnerships Act, 1962 (Act 152), and</li>
            <li>Professional Bodies pursuant to the Professional Bodies Registration Act, 1973 (N.R.C.D. 143), other than Professional Bodies established by an Act of the Parliament</li>
          </ol>
        </div>

        <div>
          <h3 className="text-base font-medium text-white mb-4">Regulation</h3>
          <ol className="list-decimal list-outside pl-5 space-y-3 text-sm text-slate-400 leading-relaxed">
            <li>To appoint Inspectors, Receivers or Managers to ensure effective compliance with the Act</li>
            <li>Discharge duties and perform functions of the Office as the Regulator of Insolvency Practitioners and the Official Liquidator under the Corporate Insolvency and Restructuring Act, 2020 (Act 1015) and its Amendment, 2020 (Act 1031)</li>
            <li>Responsible for collecting and collating information on business entities registered in Ghana.</li>
          </ol>
        </div>

        <div>
          <h3 className="text-base font-medium text-white mb-4">Education</h3>
          <ol className="list-decimal list-outside pl-5 space-y-3 text-sm text-slate-400 leading-relaxed">
            <li>To undertake public education programmes to educate the general public engaged in business activities on the operation of Companies, Partnerships, Business Names and Professional Bodies</li>
            <li>Dissemination of information on business entities registered in the Business Register</li>
          </ol>
        </div>
      </div>
    </Section>
  );
}