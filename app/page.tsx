import GlyphPicture from "@/components/GlyphPicture";
import Toggles from "@/components/Toggles";
import WorkTabs from "@/components/WorkTabs";
import { T } from "@/components/T";
import { moonLevels, MOON_TEXT } from "@/lib/moon";
import portrait from "@/lib/portrait.json";

const EMAIL = "manuel.munoz@yachaytech.edu.ec";
const EMAIL_ALTS = ["manuel131202@outlook.com", "manuel976431@gmail.com"];
const PHONE = "+593969768860";
const PHONE_LABEL = "+593 96 976 8860";
const GITHUB = "https://github.com/xMane13";
const PORTRAIT_TEXT = "manuel maria munoz cardenas. moon. xmane13. yachay tech. urcuqui. ecuador. ";

type Row = {
  name: { en: string; es: string };
  what: { en: string; es: string };
  year: string;
  repo?: string;
  lead?: boolean;
};

const research: Row[] = [
  { name: { en: "Pap smear audit", es: "Auditoría de citología" }, what: { en: "Leakage, probes and Grad-CAM on SIPaKMeD", es: "Fuga, sondeo lineal y Grad-CAM en SIPaKMeD" }, year: "2026", repo: "cervical-cancer-sipakmed", lead: true },
  { name: { en: "Deepfake detection", es: "Detección de deepfakes" }, what: { en: "Xception on FaceForensics++, with A. Chávez", es: "Xception en FaceForensics++, con A. Chávez" }, year: "2026", repo: "Detection-DeepFake-FF-" },
  { name: { en: "FedParam-RAG", es: "FedParam-RAG" }, what: { en: "Per-silo LoRA adapters that never share text", es: "Adaptadores LoRA por silo que no comparten texto" }, year: "2026", repo: "FedParamRag" },
  { name: { en: "FLEAD", es: "FLEAD" }, what: { en: "Federated learning on Raspberry Pi class devices", es: "Aprendizaje federado en dispositivos tipo Raspberry Pi" }, year: "2026" },
  { name: { en: "Quest Align", es: "Quest Align" }, what: { en: "Spinal posture from Quest 3S; 2nd at CompuFest", es: "Postura con Quest 3S; 2.º en CompuFest" }, year: "2026" },
  { name: { en: "Math2Braille", es: "Math2Braille" }, what: { en: "Math PDFs into Nemeth Braille; a Springer paper", es: "PDF de matemáticas a Braille Nemeth; artículo en Springer" }, year: "2023" },
];

const software: Row[] = [
  { name: { en: "Conecta Talento", es: "Conecta Talento" }, what: { en: "Job fair platform: QR passes, four roles, live capacity", es: "Plataforma de feria laboral: pases QR, cuatro roles, aforo en vivo" }, year: "2026", lead: true },
  { name: { en: "Kichwa Yachay", es: "Kichwa Yachay" }, what: { en: "Materials for learning Kichwa, Django and React", es: "Materiales para aprender kichwa, Django y React" }, year: "2025", repo: "KiwchaYachay" },
  { name: { en: "Maderine POS", es: "Maderine POS" }, what: { en: "Point of sale in daily use at a cafeteria", es: "Punto de venta en uso diario en una cafetería" }, year: "2025" },
  { name: { en: "DES from the spec", es: "DES desde el estándar" }, what: { en: "The block cipher in C++, written from the standard", es: "El cifrado por bloques en C++, escrito desde el estándar" }, year: "2026", repo: "des-cipher" },
  { name: { en: "ESP32 WiFi scanner", es: "Escáner WiFi ESP32" }, what: { en: "Firmware that maps nearby networks and channels", es: "Firmware que mapea redes y canales cercanos" }, year: "2026", repo: "wifi_scanner" },
];

function Index({ rows, caption }: { rows: Row[]; caption: { en: string; es: string } }) {
  return (
    <table className="index" aria-label={caption.en}>
      <thead>
        <tr>
          <th scope="col"><T en="Project" es="Proyecto" /></th>
          <th scope="col"><T en="What it does" es="Qué hace" /></th>
          <th scope="col" className="num"><T en="Year" es="Año" /></th>
          <th scope="col"><T en="Code" es="Código" /></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((w) => (
          <tr key={w.name.en} className={w.lead ? "is-lead" : undefined}>
            <th scope="row"><T en={w.name.en} es={w.name.es} /></th>
            <td><T en={w.what.en} es={w.what.es} /></td>
            <td className="num">{w.year}</td>
            <td>
              {w.repo ? (
                <a className="code-link" href={`${GITHUB}/${w.repo}`} aria-label={`${w.name.en} on GitHub`}><T en="open" es="abrir" /></a>
              ) : (
                <span className="muted"><T en="not public" es="no público" /></span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page() {
  const moon = moonLevels();
  const face = portrait.rows_data.map((r) => Array.from(r, Number));
  return (
    <>
      <a className="skip" href="#main">
        <T en="Skip to content" es="Ir al contenido" />
      </a>
      <header className="nav">
        <div className="container nav__row">
          <a className="wordmark" href="#top" aria-label="moon, home">moon</a>
          <nav aria-label="Sections">
            <ul className="nav__links">
              <li><a href="#research"><T en="research" es="investigación" /></a></li>
              <li><a href="#work"><T en="work" es="proyectos" /></a></li>
              <li><a href="#about"><T en="about" es="sobre mí" /></a></li>
              <li><a href="#papers"><T en="papers" es="artículos" /></a></li>
            </ul>
          </nav>
          <div className="nav__end">
            <a className="nav__mail" href={`mailto:${EMAIL}`}><T en="email" es="correo" /></a>
            <Toggles />
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero__grid">
            <div className="hero__text">
              <h1>
                <T en="Software, models, and proof they work." es="Software, modelos y pruebas de que funcionan." />
              </h1>
              <T
                as="p"
                className="lead"
                en="CS engineering student in Ecuador: vision, federated learning and full-stack software."
                es="Estudiante de ingeniería en computación en Ecuador: visión, aprendizaje federado y software."
              />
              <div className="actions">
                <a className="btn btn--primary" href={`mailto:${EMAIL}`}><T en="Email me" es="Escríbeme" /></a>
                <a className="btn btn--secondary" href="/cv.pdf"><T en="Read my CV" es="Ver mi CV" /></a>
              </div>
            </div>
            <GlyphPicture className="hero__art" levels={moon} text={MOON_TEXT} label="The Moon, printed in the words of this page" />
          </div>
        </section>

        <section className="research" id="research">
          <div className="container research__grid">
            <div className="prose">
              <div className="para">
                <T as="h2" className="inline" en="Evaluation before accuracy." es="Evaluar antes que acertar." />{" "}
                <T
                  as="p"
                  en={<>A Pap smear classifier scored 98% on random splits. Split by slide, it hid one error in four and read colour, not shape.</>}
                  es={<>Un clasificador de citologías llegaba al 98% con particiones al azar. Separado por lámina, escondía uno de cada cuatro errores y leía color, no forma.</>}
                />
              </div>
              <div className="para">
                <T as="h2" className="inline" en="The network is part of the model." es="La red también es el modelo." />{" "}
                <T
                  as="p"
                  en={<>My thesis trains federated models in ns-3, where every update is a packet that can be lost. <a href="#thesis">See the fix</a>.</>}
                  es={<>Mi tesis entrena modelos federados en ns-3, donde cada actualización es un paquete que se puede perder. <a href="#thesis">Mira la solución</a>.</>}
                />
              </div>
              <div className="para">
                <T as="h2" className="inline" en="Software that ships." es="Software que se usa." />{" "}
                <T
                  as="p"
                  en={<>A cafeteria runs on my point of sale.</>}
                  es={<>Una cafetería funciona con mi punto de venta.</>}
                />
              </div>
            </div>
            <aside className="margin" aria-label="Notes">
              <p className="note">
                <a className="code-link" href={`${GITHUB}/cervical-cancer-sipakmed`}><T en="The audit on GitHub" es="La auditoría en GitHub" /></a>
              </p>
            </aside>
          </div>
        </section>

        <section className="case" id="thesis">
          <div className="container">
            <div className="case__head">
              <h2><T en="What staggering changed" es="Lo que cambió escalonar" /></h2>
              <T
                as="p"
                className="lead"
                en="Each edge sets its upload window from its own MAC failures."
                es="Cada edge fija su ventana de subida según los fallos de su MAC."
              />
            </div>
            <figure className="diff well" aria-labelledby="diff-cap">
              <div className="diff__files">
                <span>--- a/immediate-uploads</span>
                <span>+++ b/adaptive-upload-staggering</span>
              </div>
              <ol className="diff__lines">
                <li className="hunk"><T en="@@ completed rounds, shared channel, no loss @@" es="@@ rondas completadas, canal compartido, sin pérdida @@" /></li>
                <li className="del"><span className="diff__k"><T en="4 x 4 clients" es="4 x 4 clientes" /></span><span className="figure">31%</span></li>
                <li className="add"><span className="diff__k"><T en="4 x 4 clients" es="4 x 4 clientes" /></span><span className="figure">98%</span></li>
                <li className="del"><span className="diff__k"><T en="8 x 4 clients" es="8 x 4 clientes" /></span><span className="figure">14%</span></li>
                <li className="add"><span className="diff__k"><T en="8 x 4 clients" es="8 x 4 clientes" /></span><span className="figure">92%</span></li>
              </ol>
              <figcaption id="diff-cap">
                <T
                  en="10 paired replicas in ns-3. With moving nodes it still recovers rounds, but not the contention between cells."
                  es="10 réplicas pareadas en ns-3. Con nodos en movimiento aún recupera rondas, pero no la contención entre celdas."
                />
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="work" id="work">
          <div className="container">
            <h2><T en="Work you can open" es="Proyectos que puedes abrir" /></h2>
            <WorkTabs
              label="Projects"
              tabs={[
                { id: "research", label: <T en="research" es="investigación" />, panel: <Index rows={research} caption={{ en: "Research projects", es: "Proyectos de investigación" }} /> },
                { id: "software", label: <T en="software" es="software" />, panel: <Index rows={software} caption={{ en: "Software projects", es: "Proyectos de software" }} /> },
              ]}
            />
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about__grid">
            <div className="about__text">
              <h2><T en="Yachay Tech, Urcuquí" es="Yachay Tech, Urcuquí" /></h2>
              <ul className="roles">
                <li>
                  <h3><T en="IEEE CIS chapter" es="Capítulo IEEE CIS" /></h3>
                  <T as="p" en="President. AI workshops, and Conecta YT, a national job fair." es="Presidente. Talleres de IA y Conecta YT, una feria laboral nacional." />
                </li>
                <li>
                  <h3><T en="A course in C" es="Un curso de C" /></h3>
                  <T as="p" en="Twelve preparatory sessions on pointers, arrays and memory." es="Doce sesiones preparatorias de punteros, arreglos y memoria." />
                </li>
                <li>
                  <h3><T en="Physics first" es="Primero, física" /></h3>
                  <T as="p" en="Five semesters of physics came before computer science." es="Antes de computación estudié cinco semestres de física." />
                </li>
              </ul>
            </div>
            <GlyphPicture className="about__art" levels={face} text={PORTRAIT_TEXT} label="Portrait of Manuel, printed in the letters of his name" />
          </div>
        </section>

        <section className="papers" id="papers">
          <div className="container">
            <h2><T en="Published, and on the way" es="Publicado, y en camino" /></h2>
            <ol className="refs">
              <li>
                <p className="ref__title">Development of a Python Program for Converting Spanish Math PDFs Into Braille</p>
                <p className="ref__where">
                  CSEI 2023, Springer LNNS vol. 797, 2024.{" "}
                  <a href="https://doi.org/10.1007/978-3-031-70981-4_18">doi:10.1007/978-3-031-70981-4_18</a>
                </p>
              </li>
              <li>
                <p className="ref__title">La Fórmula de Leibniz y el Truco Favorito de Feynman</p>
                <p className="ref__where">
                  Mixba&apos;al, Revista Metropolitana de Matemáticas 15(1), 2024.{" "}
                  <a href="https://doi.org/10.24275/uami/dcbi/mix/v15n1/eljerm">doi:10.24275/uami/dcbi/mix/v15n1/eljerm</a>
                </p>
              </li>
              <li>
                <p className="ref__title"><T en="Four manuscripts in preparation" es="Cuatro manuscritos en preparación" /></p>
                <p className="ref__where">
                  <T en="Geometric classifiers for intrusion detection, with E. Hurtado-Almeida." es="Clasificadores geométricos para detección de intrusiones, con E. Hurtado-Almeida." />
                </p>
              </li>
            </ol>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <T
            as="p"
            className="footer__statement"
            en="Write to me about research, a project or a job."
            es="Escríbeme por investigación, un proyecto o un trabajo."
          />
          <a className="footer__mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <ul className="footer__contact">
            {EMAIL_ALTS.map((m) => <li key={m}><a href={`mailto:${m}`}>{m}</a></li>)}
            <li><a href={`tel:${PHONE}`}>{PHONE_LABEL}</a></li>
          </ul>
          <ul className="footer__links">
            <li><a href={GITHUB}>GitHub</a></li>
            <li><a href="https://scholar.google.com/citations?user=NJvixZwAAAAJ">Google Scholar</a></li>
            <li><a href="https://orcid.org/0009-0002-0435-3631">ORCID</a></li>
            <li><a href="https://www.linkedin.com/in/manuelmoon/">LinkedIn</a></li>
            <li><a href="/cv.pdf">CV</a></li>
          </ul>
          <p className="footer__legal">© 2026 Manuel M. Muñoz-Cárdenas</p>
        </div>
      </footer>
    </>
  );
}
