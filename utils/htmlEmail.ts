export function html({ url, text }: { url: string; text: string }) {
  return ` <h2>Hi I am Naresh Bhosale</h2>
    <p>
      Contratulation You're almost set to start using NextAuthV4 just click the
      button below to validate your email address
    </p>
    <a href=${url}>${text}</a>`;
}
