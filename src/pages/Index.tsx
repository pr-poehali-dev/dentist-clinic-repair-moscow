import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO = 'https://cdn.poehali.dev/projects/a0a512a0-1999-4440-b1b6-0f6f168097ed/files/cbf210ba-35bd-4c43-ba07-7b3940c1ed8e.jpg';
const BEFORE = 'https://cdn.poehali.dev/projects/a0a512a0-1999-4440-b1b6-0f6f168097ed/files/c3157c3b-7aa6-44ae-b7fe-aa7478f5fe20.jpg';
const AFTER = 'https://cdn.poehali.dev/projects/a0a512a0-1999-4440-b1b6-0f6f168097ed/files/6a6f8b20-695d-48a7-b3f2-02bf7587619d.jpg';

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'О компании', href: '#about' },
  { label: 'Процесс', href: '#process' },
  { label: 'Блог', href: '#blog' },
  { label: 'Контакты', href: '#contacts' },
];

const SERVICES = [
  { icon: 'PencilRuler', title: 'Проектирование', text: 'Дизайн-проект клиники с учётом эргономики и медицинских стандартов.' },
  { icon: 'Hammer', title: 'Отделка под ключ', text: 'Премиальная отделка кабинетов, зон ожидания и стерилизационных.' },
  { icon: 'ShieldCheck', title: 'Стандарты СанПиН', text: 'Полное соответствие требованиям к медицинским помещениям и лицензированию.' },
  { icon: 'Wind', title: 'Инженерные системы', text: 'Вентиляция, медицинский газ, электрика, слаботочка, водоподготовка.' },
  { icon: 'Sofa', title: 'Меблировка', text: 'Подбор и установка мебели, ресепшн, систем хранения премиум-класса.' },
  { icon: 'KeyRound', title: 'Сдача под лицензию', text: 'Готовое помещение, принимаемое Роспотребнадзором с первого раза.' },
];

const FILTERS = [
  { key: 'all', label: 'Все работы' },
  { key: 'cabinet', label: 'Кабинеты' },
  { key: 'reception', label: 'Ресепшн' },
  { key: 'waiting', label: 'Зоны ожидания' },
];

const WORKS = [
  { type: 'cabinet', title: 'Стоматологический кабинет', area: '24 м²', district: 'Хамовники', before: BEFORE, after: HERO },
  { type: 'reception', title: 'Зона ресепшн', area: '36 м²', district: 'Пресня', before: BEFORE, after: AFTER },
  { type: 'waiting', title: 'Зона ожидания', area: '42 м²', district: 'Арбат', before: BEFORE, after: AFTER },
  { type: 'cabinet', title: 'Хирургический кабинет', area: '28 м²', district: 'Тверская', before: BEFORE, after: HERO },
  { type: 'reception', title: 'Холл и регистратура', area: '50 м²', district: 'Сокол', before: BEFORE, after: AFTER },
  { type: 'waiting', title: 'Детская зона ожидания', area: '30 м²', district: 'Митино', before: BEFORE, after: HERO },
];

const PROCESS = [
  { n: '01', title: 'Замер и бриф', text: 'Выезжаем на объект, изучаем помещение и ваши задачи.' },
  { n: '02', title: 'Проект и смета', text: 'Готовим дизайн-проект и прозрачную фиксированную смету.' },
  { n: '03', title: 'Ремонт', text: 'Выполняем работы по графику с еженедельными отчётами.' },
  { n: '04', title: 'Сдача под ключ', text: 'Передаём клинику, готовую к лицензированию и приёму пациентов.' },
];

const BLOG = [
  { tag: 'Стандарты', title: 'СанПиН 2025: что изменилось для стоматологий', date: '12 июня' },
  { tag: 'Дизайн', title: 'Премиальный интерьер клиники: 7 принципов', date: '4 июня' },
  { tag: 'Бюджет', title: 'Из чего складывается стоимость ремонта под ключ', date: '28 мая' },
];

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm select-none group/ba">
      <img src={after} alt="После" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="До" className="absolute inset-0 h-full object-cover grayscale" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
        <span className="absolute top-3 left-3 text-[11px] tracking-widest uppercase bg-black/50 text-white px-2 py-1 rounded-sm">До</span>
      </div>
      <span className="absolute top-3 right-3 text-[11px] tracking-widest uppercase bg-gold text-emerald px-2 py-1 rounded-sm font-medium">После</span>
      <div className="absolute inset-y-0 w-px bg-gold pointer-events-none" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-lg">
          <Icon name="MoveHorizontal" size={16} className="text-emerald" />
        </span>
      </div>
      <input
        type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Сравнить до и после"
      />
    </div>
  );
}

const Index = () => {
  const [filter, setFilter] = useState('all');
  const visible = WORKS.filter((w) => filter === 'all' || w.type === filter);

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full emerald-gradient flex items-center justify-center">
              <Icon name="Plus" size={18} className="text-gold" />
            </span>
            <span className="font-display text-2xl tracking-wide">ДЕНТАЛ<span className="text-gold">РЕМОНТ</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button className="bg-emerald text-primary-foreground hover:bg-emerald/90 rounded-none px-6">Обсудить проект</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative emerald-gradient grain text-primary-foreground overflow-hidden">
        <div className="container pt-40 pb-28 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-up">
            <p className="flex items-center gap-3 text-gold text-sm tracking-[0.25em] uppercase mb-6">
              <span className="w-10 h-px bg-gold" /> Москва · под ключ
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-7">
              Ремонт <span className="gold-text italic">стоматологических</span> клиник премиум-класса
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-md mb-10">
              Проектируем и строим клиники, готовые к лицензированию. Соответствие СанПиН, сроки в договоре, безупречная эстетика.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="gold-gradient text-emerald hover:opacity-90 rounded-none px-8 h-12 text-base font-medium">Рассчитать стоимость</Button>
              <Button variant="outline" className="rounded-none px-8 h-12 text-base border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#portfolio">Смотреть работы</a>
              </Button>
            </div>
            <div className="flex gap-10 mt-14">
              {[['120+', 'клиник сдано'], ['12 лет', 'на рынке'], ['100%', 'приём с 1 раза']].map(([a, b]) => (
                <div key={b}>
                  <div className="font-display text-4xl text-gold">{a}</div>
                  <div className="text-xs uppercase tracking-widest text-primary-foreground/50 mt-1">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 border border-gold/30 rounded-sm" />
            <img src={HERO} alt="Премиальная стоматологическая клиника" className="relative w-full aspect-[4/5] object-cover rounded-sm shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">Что мы делаем</p>
          <h2 className="font-display text-4xl md:text-5xl">Услуги полного цикла</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-background p-10 group hover:bg-secondary transition-colors duration-500">
              <span className="inline-flex w-14 h-14 rounded-full bg-secondary group-hover:bg-background items-center justify-center mb-6 transition-colors">
                <Icon name={s.icon} size={24} className="text-gold" />
              </span>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio — interactive before/after */}
      <section id="portfolio" className="bg-secondary/50 py-28">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">Галерея до / после</p>
              <h2 className="font-display text-4xl md:text-5xl max-w-md">Перетащите ползунок и оцените результат</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-5 py-2 text-sm tracking-wide rounded-none border transition-all ${
                    filter === f.key
                      ? 'bg-emerald text-primary-foreground border-emerald'
                      : 'bg-transparent border-border text-muted-foreground hover:border-gold hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((w) => (
              <div key={w.title} className="bg-background p-3 rounded-sm hover-lift">
                <BeforeAfter before={w.before} after={w.after} />
                <div className="flex items-center justify-between px-2 pt-4 pb-1">
                  <div>
                    <h3 className="font-display text-xl">{w.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{w.district} · {w.area}</p>
                  </div>
                  <Icon name="ArrowUpRight" size={20} className="text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={AFTER} alt="О компании" className="w-full aspect-[5/4] object-cover rounded-sm" />
          <div className="absolute -bottom-8 -right-4 bg-emerald text-primary-foreground p-8 rounded-sm max-w-[220px] hidden md:block">
            <div className="font-display text-5xl text-gold mb-1">12</div>
            <p className="text-sm text-primary-foreground/70">лет строим медицинские пространства в Москве</p>
          </div>
        </div>
        <div>
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">О компании</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Специализируемся только на стоматологиях</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Мы понимаем медицинские стандарты изнутри: знаем требования к стерилизационным, вентиляции и материалам. Поэтому каждая клиника сдаётся под лицензию без замечаний.
          </p>
          <ul className="space-y-4">
            {['Фиксированная смета без скрытых доплат', 'Сроки и гарантия прописаны в договоре', 'Собственная команда инженеров и прорабов'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Icon name="Check" size={18} className="text-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="emerald-gradient grain text-primary-foreground py-28">
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">Как мы работаем</p>
            <h2 className="font-display text-4xl md:text-5xl">Процесс из четырёх шагов</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
            {PROCESS.map((p) => (
              <div key={p.n} className="bg-transparent p-8">
                <div className="font-display text-6xl text-gold/40 mb-4">{p.n}</div>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="container py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">Журнал</p>
            <h2 className="font-display text-4xl md:text-5xl">Полезное о ремонте клиник</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm tracking-wide hover:text-gold transition-colors">Все статьи <Icon name="ArrowRight" size={16} /></a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BLOG.map((b) => (
            <article key={b.title} className="group cursor-pointer">
              <div className="aspect-[3/2] overflow-hidden rounded-sm mb-5">
                <img src={HERO} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground mb-3">
                <span className="text-gold">{b.tag}</span> · <span>{b.date}</span>
              </div>
              <h3 className="font-display text-2xl leading-snug group-hover:text-gold transition-colors">{b.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="container pb-28">
        <div className="emerald-gradient grain rounded-sm text-primary-foreground p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-5">Готовы построить клинику мечты?</h2>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">Оставьте контакты — пришлём смету и примеры работ под ваш формат в течение дня.</p>
              <div className="space-y-3 text-primary-foreground/80">
                <p className="flex items-center gap-3"><Icon name="Phone" size={18} className="text-gold" /> +7 (495) 000-00-00</p>
                <p className="flex items-center gap-3"><Icon name="Mail" size={18} className="text-gold" /> hello@dentalremont.ru</p>
                <p className="flex items-center gap-3"><Icon name="MapPin" size={18} className="text-gold" /> Москва, ул. Премиальная, 1</p>
              </div>
            </div>
            <form className="bg-primary-foreground/5 backdrop-blur p-8 rounded-sm border border-primary-foreground/10 space-y-4">
              <input placeholder="Ваше имя" className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 rounded-none placeholder:text-primary-foreground/40 focus:border-gold outline-none transition-colors" />
              <input placeholder="Телефон" className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 rounded-none placeholder:text-primary-foreground/40 focus:border-gold outline-none transition-colors" />
              <textarea placeholder="Площадь и пожелания" rows={3} className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 rounded-none placeholder:text-primary-foreground/40 focus:border-gold outline-none transition-colors resize-none" />
              <Button className="w-full gold-gradient text-emerald hover:opacity-90 rounded-none h-12 text-base font-medium">Получить смету</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display text-xl text-foreground">ДЕНТАЛ<span className="text-gold">РЕМОНТ</span></span>
          <p>© 2026 Ремонт стоматологических клиник под ключ · Москва</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
