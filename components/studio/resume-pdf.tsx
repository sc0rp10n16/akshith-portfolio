import type { ReactNode } from "react";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import {
  contactParts,
  linkHref,
  splitLinkPieces,
  type LinkPiece,
} from "@/lib/studio/links";
import type { ResumeData, TemplateId } from "@/lib/studio/resume";
import { filledLines, templateTokens } from "@/lib/studio/templates";

export function ResumePdf({
  data,
  templateId,
}: {
  data: ResumeData;
  templateId: TemplateId;
}) {
  const tokens = templateTokens[templateId];
  const styles = makeStyles(tokens);
  const contacts = contactParts(data);
  const experience = data.experience.filter(
    (row) => row.role.trim() || row.company.trim() || filledLines(row.bullets).length > 0,
  );
  const education = data.education.filter(
    (row) => row.school.trim() || row.degree.trim() || row.notes.trim(),
  );
  const projects = data.projects.filter(
    (row) => row.name.trim() || filledLines(row.bullets).length > 0,
  );
  const skills = data.skills.filter((row) => row.group.trim() || row.items.trim());
  const extras = data.extras.filter((row) => row.title.trim() || row.body.trim());

  return (
    <Document title={data.name.trim() || "Resume"} author={data.name.trim()}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name.trim() || "Name"}</Text>
          {data.headline.trim() ? (
            <Text style={styles.headline}>{data.headline.trim()}</Text>
          ) : null}
          {contacts.length > 0 ? (
            <Text style={styles.contacts}>
              {contacts.map((part, index) => (
                <Text key={`${index}-${part.text}`}>
                  {index > 0 ? "  ·  " : ""}
                  <LinkedRun piece={part} linkStyle={styles.link} />
                </Text>
              ))}
            </Text>
          ) : null}
        </View>

        {data.summary.trim() ? (
          <Section title="Summary" styles={styles}>
            <LinkedText text={data.summary.trim()} style={styles.body} linkStyle={styles.link} />
          </Section>
        ) : null}

        {experience.length > 0 ? (
          <Section title="Experience" styles={styles}>
            {experience.map((row) => (
              <View key={row.id} style={styles.block} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {row.role.trim() || "Role"}
                    {row.company.trim() ? `, ${row.company.trim()}` : ""}
                  </Text>
                  <Text style={styles.muted}>
                    {[row.start.trim(), row.end.trim()].filter(Boolean).join(" – ")}
                  </Text>
                </View>
                {row.location.trim() ? (
                  <Text style={styles.italic}>{row.location.trim()}</Text>
                ) : null}
                <Bullets items={filledLines(row.bullets)} styles={styles} />
              </View>
            ))}
          </Section>
        ) : null}

        {education.length > 0 ? (
          <Section title="Education" styles={styles}>
            {education.map((row) => (
              <View key={row.id} style={styles.block} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {row.degree.trim() || "Degree"}
                    {row.school.trim() ? `, ${row.school.trim()}` : ""}
                  </Text>
                  <Text style={styles.muted}>
                    {[row.start.trim(), row.end.trim()].filter(Boolean).join(" – ")}
                  </Text>
                </View>
                {row.location.trim() ? (
                  <Text style={styles.italic}>{row.location.trim()}</Text>
                ) : null}
                {row.notes.trim() ? (
                  <LinkedText
                    text={row.notes.trim()}
                    style={styles.body}
                    linkStyle={styles.link}
                  />
                ) : null}
              </View>
            ))}
          </Section>
        ) : null}

        {projects.length > 0 ? (
          <Section title="Projects" styles={styles}>
            {projects.map((row) => (
              <View key={row.id} style={styles.block} wrap={false}>
                <Text style={styles.itemTitle}>
                  {row.name.trim() || "Project"}
                  {row.href.trim() ? " — " : ""}
                  {row.href.trim() ? (
                    <Link src={absoluteHref(row.href)} style={styles.link}>
                      {row.href.trim()}
                    </Link>
                  ) : null}
                </Text>
                <Bullets items={filledLines(row.bullets)} styles={styles} />
              </View>
            ))}
          </Section>
        ) : null}

        {skills.length > 0 ? (
          <Section title="Skills" styles={styles}>
            {skills.map((row) => (
              <LinkedText
                key={row.id}
                text={`${row.group.trim() ? `${row.group.trim()}: ` : ""}${row.items.trim()}`}
                style={styles.body}
                linkStyle={styles.link}
              />
            ))}
          </Section>
        ) : null}

        {extras.length > 0 ? (
          <Section title="Additional" styles={styles}>
            {extras.map((row) => (
              <View key={row.id} style={styles.block} wrap={false}>
                <Text style={styles.itemTitle}>
                  {row.title.trim() || "Item"}
                  {row.href.trim() ? " — " : ""}
                  {row.href.trim() ? (
                    <Link src={absoluteHref(row.href)} style={styles.link}>
                      {row.href.trim()}
                    </Link>
                  ) : null}
                </Text>
                {row.body.trim() ? (
                  <LinkedText
                    text={row.body.trim()}
                    style={styles.body}
                    linkStyle={styles.link}
                  />
                ) : null}
              </View>
            ))}
          </Section>
        ) : null}
      </Page>
    </Document>
  );
}

function Section({
  title,
  styles,
  children,
}: {
  title: string;
  styles: ReturnType<typeof makeStyles>;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function absoluteHref(raw: string): string {
  const value = raw.trim();
  return linkHref(value) ?? value;
}

function LinkedRun({
  piece,
  linkStyle,
}: {
  piece: LinkPiece;
  linkStyle: Style;
}) {
  if (!piece.href) {
    return piece.text;
  }

  return (
    <Link src={piece.href} style={linkStyle}>
      {piece.text}
    </Link>
  );
}

function LinkedText({
  text,
  style,
  linkStyle,
}: {
  text: string;
  style?: Style;
  linkStyle: Style;
}) {
  const pieces = splitLinkPieces(text);
  if (!pieces.some((piece) => piece.href)) {
    return <Text style={style}>{text}</Text>;
  }

  return (
    <Text style={style}>
      {pieces.map((piece, index) => (
        <LinkedRun key={`${index}-${piece.text}`} piece={piece} linkStyle={linkStyle} />
      ))}
    </Text>
  );
}

function Bullets({
  items,
  styles,
}: {
  items: string[];
  styles: ReturnType<typeof makeStyles>;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.bullets}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletMark}>•</Text>
          <LinkedText text={item} style={styles.bulletText} linkStyle={styles.link} />
        </View>
      ))}
    </View>
  );
}

function makeStyles(tokens: (typeof templateTokens)[TemplateId]) {
  return StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: tokens.bodySize,
      lineHeight: tokens.lineHeight,
      color: "#111111",
      padding: tokens.pagePad,
    },
    header: {
      textAlign: "center",
      marginBottom: 4,
    },
    name: {
      fontFamily: "Helvetica-Bold",
      fontSize: tokens.nameSize,
    },
    headline: {
      marginTop: 3,
      fontSize: tokens.headlineSize,
      color: "#333333",
    },
    contacts: {
      marginTop: 6,
      fontSize: tokens.bodySize,
      color: "#333333",
    },
    section: {
      marginTop: tokens.gap + 6,
    },
    sectionTitle: {
      fontFamily: "Helvetica-Bold",
      fontSize: tokens.sectionSize,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      borderBottomWidth: 1,
      borderBottomColor: "#111111",
      paddingBottom: 2,
      marginBottom: tokens.gap,
    },
    block: {
      marginBottom: tokens.gap,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    bold: {
      fontFamily: "Helvetica-Bold",
      flexGrow: 1,
      flexShrink: 1,
    },
    itemTitle: {
      fontFamily: "Helvetica-Bold",
    },
    muted: {
      color: "#333333",
    },
    italic: {
      fontFamily: "Helvetica-Oblique",
      color: "#333333",
    },
    body: {
      marginTop: 2,
    },
    link: {
      color: "#333333",
      textDecoration: "none",
    },
    bullets: {
      marginTop: 3,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 2,
    },
    bulletMark: {
      width: 10,
    },
    bulletText: {
      flexGrow: 1,
      flexShrink: 1,
    },
  });
}
