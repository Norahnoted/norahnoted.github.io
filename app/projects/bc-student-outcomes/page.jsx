'use client';

import { motion } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const caption = 'text-xs text-center text-gray-400 dark:text-white/40 font-PlusJakarta italic';

const edaFigures = [
  {
    src: '/bcStudentOutcomes/image1.png',
    caption: 'Figure 1: Full-time Employment and Unemployment Rate by Program Area',
    description: 'This bar chart shows that full-time employment rates are highest across most program areas, especially in technical and vocational fields like Health, Engineering, and Electrician. Self-employment is more common in creative fields such as Visual and Performing Arts. Unemployment rates are generally low, though slightly higher in Humanities, Arts and Sciences, and Social Sciences.',
  },
  {
    src: '/bcStudentOutcomes/image2.png',
    caption: 'Figure 2: Distribution of Satisfaction Rate for Top 20 Institutions',
    description: 'This box plot shows the top 20 institutions with the highest student satisfaction rates, offering an overview of institutional performance across British Columbia.',
  },
  {
    src: '/bcStudentOutcomes/image3.png',
    caption: 'Figure 3: Proportion Considering Job Related to Field by Program Area',
    description: 'This chart shows that graduates from Health programs are most likely to consider their jobs related to their field of study, while those from Arts and Sciences and Humanities programs report the lowest perceived relevance.',
  },
  {
    src: '/bcStudentOutcomes/image4.png',
    caption: 'Figure 4: Distribution of Median Wages by Program Area',
    description: 'This box plot shows the distribution of median wages across program areas. Health and Engineering programs tend to offer the highest median wages, while fields like Arts and Humanities show lower wage ranges. Some program areas are not displayed due to insufficient sample sizes.',
  },
  {
    src: '/bcStudentOutcomes/image5.png',
    caption: 'Figure 5: Percentage Pursuing Further Studies by Credential',
    description: 'This chart shows that individuals with an associate degree are most likely to pursue further studies, followed by those with a bachelor\'s degree.',
  },
  {
    src: '/bcStudentOutcomes/image6.png',
    caption: 'Figure 6: Distribution of Full-time Employment Rates by Gender',
    description: 'The violin plot illustrates the distribution of full-time employment rates by gender across various program areas. Each violin represents the spread and density of employment rates for one gender, aggregated across all program areas. From the plot, it is evident that men tend to have a slightly higher median full-time employment rate than women. In contrast, the distribution for women is more dispersed, indicating a wider range of employment rates across different fields.',
  },
];

const project = {
  id: 'bc-student-outcomes',
  title: 'BC Student Outcomes Data Analysis',
  description: 'Data Analysis',
  bgImage: '/bcStudentOutcomes/image4.png',
  category: 'Business Analysis',
  isGroup: false,
  tags: ['Python'],
  duration: 'Jun 2025 – Aug 2025',
  overview:
    'A data analysis case study to explore multiple dimensions of post-secondary student outcomes in British Columbia from 2022 to 2024, using three years of aggregated survey data collected by BC Stats.',
  tools: ['Python (pandas)', 'Seaborn', 'Matplotlib'],
};


const sectionAnim = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.3 },
  viewport: { once: true },
};

export default function Page() {
  return (
    <ProjectLayout project={project}>
      <div className="flex flex-col gap-10">

        {/* Introduction */}
        <motion.div {...sectionAnim} className="flex flex-col gap-6">
          <h2 className={heading}>Introduction</h2>
          <div className={`flex flex-col gap-4 ${body}`}>
            <p>
              The dataset, titled the BC Student Outcomes Program Data, includes responses from tens of thousands of former students surveyed approximately 6 to 18 months after completing their studies. It captures key indicators such as employment status, relevance of education to current occupation, satisfaction with educational experience, and intentions to pursue further studies.
            </p>
            <p>
              The main objective of this study is to examine whether these factors can reliably predict students' employment status after graduation. In doing so, the analysis also seeks to identify which fields of study may be more aligned with labor market demands, and to assess the extent to which post-secondary education supports students in their transition to meaningful employment.
            </p>
          </div>
        </motion.div>

        {/* Methods */}
        <motion.div {...sectionAnim} className="flex flex-col gap-4">
          <h2 className={heading}>Methods</h2>
          <ul className={`flex flex-col gap-2 ${body} list-disc list-inside pl-4`}>
            <li>Cleaned raw data using Pandas</li>
            <li>Reshaped the dataset from wide to long format using Pandas' melt function</li>
            <li>Visualized key metrics with Seaborn and Matplotlib. Bar charts for categorical comparisons, box plots for distributions, and violin plots for gender-based employment differences.</li>
            <li>Built a multiple linear regression model to predict full-time employment rates using five predictors: credential type, program area, job-training relevance, institution, and gender proportion.</li>
            <li>Split the dataset 80/20 for training and testing, with categorical variables encoded numerically.</li>
          </ul>
        </motion.div>

        {/* Exploratory Data Analysis */}
        <motion.div {...sectionAnim} className="flex flex-col gap-8">
          <h2 className={heading}>Exploratory Data Analysis</h2>
          <div className="flex flex-col gap-10">
            {edaFigures.map((fig, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col gap-3"
              >
                <p className={body}>{fig.description}</p>
                <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
                  <img src={fig.src} alt={fig.caption} className="w-full h-auto block" />
                </div>
                <p className={caption}>{fig.caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </ProjectLayout>
  );
}
