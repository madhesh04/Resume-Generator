import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import saveAs from 'file-saver';
import { Resume } from '../types';

export const downloadDocx = async (resume: Resume, fileName: string): Promise<void> => {
    const { personalInfo, experience, education, projects, skills } = resume;

    const createHeading = (text: string) => {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_2,
            border: {
                bottom: {
                    color: "auto",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6,
                },
            },
            spacing: {
                after: 200,
            }
        });
    }

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: personalInfo.name, bold: true, size: 48 }),
                    ],
                    alignment: 'center',
                }),
                new Paragraph({
                    text: personalInfo.title,
                    alignment: 'center',
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    text: `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`,
                    alignment: 'center',
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    text: `${personalInfo.linkedin} | ${personalInfo.github} | ${personalInfo.website}`,
                    alignment: 'center',
                    spacing: { after: 400 }
                }),
                
                // Summary
                createHeading("SUMMARY"),
                new Paragraph(personalInfo.summary),
                new Paragraph({}),

                // Experience
                ...(experience.length > 0 ? [
                    createHeading("EXPERIENCE"),
                    ...experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: exp.role, bold: true }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `${exp.company} | ${exp.startDate} - ${exp.endDate}`, italics: true, color: "595959" }),
                            ],
                            spacing: { after: 100 }
                        }),
                        ...exp.description.map(desc => new Paragraph({
                            text: desc,
                            bullet: {
                                level: 0,
                            },
                        })),
                        new Paragraph({}),
                    ])
                ] : []),

                // Projects
                ...(projects.length > 0 ? [
                    createHeading("PROJECTS"),
                    ...projects.flatMap(proj => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: proj.name, bold: true }),
                                new TextRun({ text: ` | ${proj.url}`, color: "0000FF", underline: {} }),
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph(proj.description),
                        new Paragraph({}),
                    ])
                ] : []),
                
                // Education
                ...(education.length > 0 ? [
                    createHeading("EDUCATION"),
                    ...education.map(edu => 
                        new Paragraph({
                            children: [
                                new TextRun({ text: edu.institution, bold: true }),
                                new TextRun({ text: ` - ${edu.degree} (${edu.startDate} - ${edu.endDate})` }),
                            ],
                        })
                    ),
                    new Paragraph({}),
                ] : []),
                
                // Skills
                ...(skills.length > 0 ? [
                    createHeading("SKILLS"),
                    new Paragraph(skills.map(skill => skill.name).join(', ')),
                ] : []),
            ],
        }],
    });

    try {
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${fileName}.docx`);
    } catch (err) {
        console.error("Error generating DOCX:", err);
        throw err;
    }
};