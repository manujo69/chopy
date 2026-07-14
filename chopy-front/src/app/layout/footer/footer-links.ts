export interface FooterColumn {
  title: string;
  links: string[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Conócenos',
    links: ['Quiénes somos', 'Trabaja con nosotros', 'Sostenibilidad', 'Prensa'],
  },
  {
    title: 'Ayuda',
    links: ['Preguntas frecuentes', 'Cómo comprar', 'Formas de entrega', 'Contacto'],
  },
  {
    title: 'Mi cuenta',
    links: ['Iniciar sesión', 'Mis pedidos', 'CHOPY club', 'Mis listas'],
  },
  {
    title: 'Legal',
    links: ['Aviso legal', 'Privacidad', 'Cookies', 'Condiciones'],
  },
];
