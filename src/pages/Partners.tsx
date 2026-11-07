import { Check, Copy } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Ext } from "../components/ExternalLink";
import { PlatformIcon } from "../components/PlatformIcon";
import { PARTNERSHIPS } from "../data/partnerships";
import { SITE } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

const INTEGRATIONS = [
  { title: "Integraciones de marca", text: "Segmentos dentro de los programas con identidad propia: la tabla de la LPF, los mejores momentos o la previa de la Selección." },
  { title: "Colaboraciones", text: "Contenido conjunto con clubes, ligas, organizadores de eventos y otros creadores del deporte panameño y regional." },
  { title: "Medición", text: "Una versión oficial puede reportar visitas y reproducciones con datos reales del sitio y de YouTube Studio. Esta demo no muestra cifras." },
];

interface FormState {
  nombre: string;
  empresa: string;
  correo: string;
  interes: string;
  mensaje: string;
}
const EMPTY: FormState = { nombre: "", empresa: "", correo: "", interes: PARTNERSHIPS[0].name, mensaje: "" };

function ContactForm() {
  const [f, setF] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (k: keyof FormState) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (f.nombre.trim().length < 2) err.nombre = "Escriba su nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo.trim())) err.correo = "Escriba un correo válido, por ejemplo nombre@empresa.com.";
    if (f.mensaje.trim().length < 10) err.mensaje = "Cuéntenos en al menos 10 caracteres qué le interesa.";
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const text = `Propuesta comercial: ${f.interes}\n\nNombre: ${f.nombre}\nEmpresa: ${f.empresa || "-"}\nCorreo: ${f.correo}\n\n${f.mensaje}`;
    if (SITE.contactEmail) {
      window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`Propuesta comercial: ${f.interes}`)}&body=${encodeURIComponent(text)}`;
    }
    setDone(text);
  };

  const copy = async () => {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(done);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white p-6" role="status" aria-live="polite">
        <h3 className="display-md text-navy">{SITE.contactEmail ? "Mensaje preparado en su correo" : "Mensaje listo para enviar"}</h3>
        {!SITE.contactEmail && (
          <p className="mt-2 text-muted">
            Esta demo no tiene un servicio de recepción configurado ni un correo comercial verificado, así que <strong>no envió nada</strong>. Copie el mensaje
            y envíelo por un canal oficial del medio.
          </p>
        )}
        <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap bg-paper p-4 font-sans text-sm">{done}</pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="btn btn-blue" onClick={copy}>
            <span className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Mensaje copiado" : "Copiar mensaje"}
            </span>
          </button>
          <Ext href={SITE.socials.find((s) => s.id === "instagram")!.url} className="btn btn-ghost-dark">
            <span>Abrir Instagram</span>
          </Ext>
          <button
            type="button"
            className="link-u px-2 text-sm"
            onClick={() => {
              setDone(null);
              setCopied(false);
              setF(EMPTY);
            }}
          >
            Escribir otro mensaje
          </button>
        </div>
      </div>
    );
  }

  const field = "mt-1 block min-h-[44px] w-full border-2 border-line bg-white px-3 py-2 focus:border-blue focus:outline-none";
  const err = (k: keyof FormState) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1 text-sm font-medium text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="bg-white p-6" aria-describedby="form-demo">
      <p id="form-demo" className="mb-5 border-l-4 border-lime bg-paper p-3 text-sm">
        <strong>Formulario de demostración.</strong> Valida los datos y prepara el mensaje, pero no lo envía: no hay un correo comercial verificado
        configurado.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="f-nombre" className="text-sm font-semibold">
            Nombre
          </label>
          <input id="f-nombre" className={field} value={f.nombre} onChange={update("nombre")} autoComplete="name" aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? "e-nombre" : undefined} />
          {err("nombre")}
        </div>
        <div>
          <label htmlFor="f-empresa" className="text-sm font-semibold">
            Empresa <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input id="f-empresa" className={field} value={f.empresa} onChange={update("empresa")} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="f-correo" className="text-sm font-semibold">
            Correo
          </label>
          <input id="f-correo" type="email" className={field} value={f.correo} onChange={update("correo")} autoComplete="email" aria-invalid={!!errors.correo} aria-describedby={errors.correo ? "e-correo" : undefined} />
          {err("correo")}
        </div>
        <div>
          <label htmlFor="f-interes" className="text-sm font-semibold">
            Espacio de interés
          </label>
          <select id="f-interes" className={field} value={f.interes} onChange={update("interes")}>
            {PARTNERSHIPS.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
            <option>Colaboración de contenido</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-mensaje" className="text-sm font-semibold">
            Mensaje
          </label>
          <textarea id="f-mensaje" rows={4} className={field} value={f.mensaje} onChange={update("mensaje")} aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? "e-mensaje" : undefined} />
          {err("mensaje")}
        </div>
      </div>
      <button type="submit" className="btn btn-blue mt-5">
        <span>Preparar mensaje</span>
      </button>
    </form>
  );
}

export default function Partners() {
  usePageMeta("Alianzas y contacto comercial", "Propuesta de espacios para patrocinadores e integraciones de marca en Meketrefes del Deporte (demo).");
  return (
    <>
      <header className="bg-lime py-12 text-navy">
        <div className="wrap">
          <h1 className="display-xl max-w-4xl">Alianzas</h1>
          <p className="mt-4 max-w-prose text-lg">
            Una web propia convierte la audiencia de YouTube, Instagram y la radio en un espacio que el medio controla y puede ofrecer a marcas. Estos son
            espacios conceptuales: ninguno está vendido.
          </p>
        </div>
      </header>

      <section className="wrap py-12" aria-labelledby="h-espacios">
        <h2 id="h-espacios" className="display-lg text-navy">
          Espacios publicitarios
        </h2>
        <ul data-tour="slots" className="mt-6 grid gap-5 md:grid-cols-2">
          {PARTNERSHIPS.map((p) => (
            <li key={p.id} className="flex flex-col border-2 border-dashed border-navy/40 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="tag bg-lime text-navy">
                  <span>Disponible</span>
                </span>
                <span className="demo-badge text-muted">Espacio demostrativo</span>
              </div>
              <h3 className="display-md mt-4 text-navy">{p.name}</h3>
              <p className="text-sm font-semibold text-blue">{p.placement}</p>
              <p className="mt-2 text-muted">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.formats.map((x) => (
                  <li key={x} className="bg-paper px-2 py-1 text-xs font-medium">
                    {x}
                  </li>
                ))}
              </ul>
              {/* Vista previa de cómo se vería el espacio dentro de la web */}
              <div className="mt-5 grid min-h-[4.5rem] place-items-center border border-line bg-[repeating-linear-gradient(135deg,var(--mk-paper)_0_10px,#fff_10px_20px)] text-sm text-muted">
                Su marca aquí
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy py-12 text-white" aria-labelledby="h-integraciones">
        <div className="wrap">
          <h2 id="h-integraciones" className="display-lg">
            Integraciones y colaboraciones
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {INTEGRATIONS.map((i) => (
              <div key={i.title} className="border-t-4 border-lime pt-4">
                <h3 className="display-sm">{i.title}</h3>
                <p className="mt-2 text-white/80">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_1.5fr]" aria-labelledby="h-contacto">
        <div>
          <h2 id="h-contacto" className="display-lg text-navy">
            Contacto comercial
          </h2>
          <p className="mt-3 text-muted">
            La demo no publica un correo comercial porque no se encontró uno verificado. Mientras tanto, el contacto se hace por los perfiles oficiales.
          </p>
          <ul className="mt-5 space-y-2">
            {SITE.socials.map((s) => (
              <li key={s.id}>
                <Ext href={s.url} className="inline-flex items-center gap-2 font-semibold text-blue hover:underline">
                  <PlatformIcon id={s.id} /> {s.label}: {s.handle}
                </Ext>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
