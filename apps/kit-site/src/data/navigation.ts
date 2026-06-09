export interface NavItem {
  name: string
  href: string
  badge?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Fundamentos",
    items: [
      { name: "Cores",           href: "/fundamentos#cores" },
      { name: "Tipografia",      href: "/fundamentos#tipografia" },
      { name: "Espaçamento",     href: "/fundamentos#espacamento" },
      { name: "Radius",          href: "/fundamentos#radius" },
      { name: "Sombras",         href: "/fundamentos#sombras" },
      { name: "Animações",       href: "/fundamentos#animacoes", badge: "novo" },
      { name: "Marca & Logo",    href: "/fundamentos#marca" },
      { name: "Imagens",         href: "/fundamentos#imagens" },
    ],
  },
  {
    title: "Componentes — Ações",
    items: [
      { name: "Button",  href: "/componentes/button" },
      { name: "Badge",   href: "/componentes/badge" },
    ],
  },
  {
    title: "Componentes — Data Display",
    items: [
      { name: "Card",      href: "/componentes/card" },
      { name: "Avatar",    href: "/componentes/avatar",    badge: "novo" },
      { name: "Table",     href: "/componentes/table",     badge: "novo" },
      { name: "Accordion", href: "/componentes/accordion", badge: "novo" },
      { name: "Carousel",  href: "/componentes/carousel",  badge: "novo" },
      { name: "Separator", href: "/componentes/separator", badge: "novo" },
    ],
  },
  {
    title: "Componentes — Data Input",
    items: [
      { name: "Input",    href: "/componentes/input" },
      { name: "Label",    href: "/componentes/label" },
      { name: "Checkbox", href: "/componentes/checkbox", badge: "novo" },
      { name: "Radio",       href: "/componentes/radio",       badge: "novo" },
      { name: "Choice Card", href: "/componentes/choice-card", badge: "novo" },
      { name: "Select",   href: "/componentes/select",   badge: "novo" },
      { name: "Textarea", href: "/componentes/textarea", badge: "novo" },
      { name: "Calendar", href: "/componentes/calendar", badge: "novo" },
      { name: "Switch",   href: "/componentes/switch",   badge: "novo" },
    ],
  },
  {
    title: "Componentes — Navegação",
    items: [
      { name: "Navbar",      href: "/componentes/navbar" },
      { name: "Tabs",        href: "/componentes/tabs" },
      { name: "Breadcrumb",  href: "/componentes/breadcrumb", badge: "novo" },
      { name: "Dropdown",    href: "/componentes/dropdown",   badge: "novo" },
      { name: "Drawer",      href: "/componentes/drawer",     badge: "novo" },
      { name: "Pagination",  href: "/componentes/pagination", badge: "novo" },
      { name: "Sidebar",     href: "/componentes/sidebar",    badge: "novo" },
    ],
  },
  {
    title: "Componentes — Feedback",
    items: [
      { name: "Alert",    href: "/componentes/alert",    badge: "novo" },
      { name: "Toast",    href: "/componentes/toast",    badge: "novo" },
      { name: "Tooltip",  href: "/componentes/tooltip",  badge: "novo" },
      { name: "Dialog",   href: "/componentes/dialog" },
      { name: "Skeleton", href: "/componentes/skeleton", badge: "novo" },
      { name: "Progress", href: "/componentes/progress", badge: "novo" },
      { name: "Spinner",  href: "/componentes/spinner",  badge: "novo" },
      { name: "Sonner",   href: "/componentes/sonner",   badge: "novo" },
    ],
  },
  {
    title: "Componentes — CRM",
    items: [
      { name: "Timeline",   href: "/componentes/timeline",   badge: "novo" },
      { name: "Asset List", href: "/componentes/asset-list", badge: "novo" },
    ],
  },
  {
    title: "Blocos",
    items: [
      { name: "Hero",         href: "/blocos/hero" },
      { name: "CTA",          href: "/blocos/cta" },
      { name: "Pricing",      href: "/blocos/pricing" },
      { name: "FAQ",          href: "/blocos/faq" },
      { name: "Testimonial",  href: "/blocos/testimonial" },
      { name: "Lead Form",    href: "/blocos/lead-form" },
      { name: "Metric Block", href: "/blocos/metric-block" },
      { name: "Footer",       href: "/blocos/footer" },
      { name: "Modal",        href: "/blocos/modal",  badge: "novo" },
      { name: "Login",        href: "/blocos/login",  badge: "novo" },
    ],
  },
]
