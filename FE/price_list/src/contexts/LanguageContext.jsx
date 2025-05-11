import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const LanguageContext = createContext();

const baseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/['"]+/g, "");

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Add these default translations as a fallback
  const defaultTranslations = {
    en: {
      "product.articleNumber": "Article No.",
      "product.name": "Product/Service",
      "product.inPrice": "In Price",
      "product.price": "Price",
      "product.unit": "Unit",
      "product.inStock": "In Stock",
      "product.description": "Description",
      "product.actions": "Actions",
      "product.searchArticle": "Search by Article Number",
      "product.searchProduct": "Search by Product Name",
      "product.new": "New Product",
      "product.printList": "Print List",
      "product.advancedMode": "Advanced Mode",
      "product.noProducts": "No products found. Create your first product!",
      "common.loading": "Loading...",
      "common.logout": "Logout",
      "terms.title": "Terms and Conditions",
      "terms.backToLogin": "Back to Login",
      "terms.content": `<p>BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.</p>
<p>You can use the program FOR FREE for 14 days.<br>
123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.</p>

<p>You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.<br>
If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.</p>

<p>Billing is for one year at a time.<br>
The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program.<br>
(When using the offer price of SEK 99, the one-year period is calculated from registration.)<br>
All prices are excluding. VAT.<br>
Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.<br>
Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.<br>
The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.<br>
The introductory offer ( SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.<br>
If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.<br>
License for the use of 123 Fakturera is of course sold in accordance with applicable laws.<br>
In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.<br>
In connection with the storage of information, the law requires that we provide you with the following information:<br>
If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don't want to be contacted, just send us an email about it.<br>
You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.<br>
For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.<br>
You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us <a href="https://online.123fakturera.se/us/?height=864&width=1536" target="_blank" rel="noopener noreferrer" data-width="864" data-height="600">here</a>. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.<br>
If you wish to contact us, please use the information on this website.<br>
Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)<br>
Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.<br>
Have a great day!</p>`,
    },
    sv: {
      "product.articleNumber": "Artikelnr.",
      "product.name": "Produkt/Tjänst",
      "product.inPrice": "Inpris",
      "product.price": "Pris",
      "product.unit": "Enhet",
      "product.inStock": "I lager",
      "product.description": "Beskrivning",
      "product.actions": "Åtgärder",
      "product.searchArticle": "Sök på artikelnummer",
      "product.searchProduct": "Sök på produktnamn",
      "product.new": "Ny produkt",
      "product.printList": "Skriv ut lista",
      "product.advancedMode": "Avancerat läge",
      "product.noProducts":
        "Inga produkter hittades. Skapa din första produkt!",
      "common.loading": "Laddar...",
      "common.logout": "Logga ut",
      "login.title": "Logga in",
      "login.username": "Användarnamn",
      "login.password": "Lösenord",
      "login.submit": "Logga in",
      "login.loggingIn": "Loggar in...",
      "login.noAccount": "Har du inget konto?",
      "login.signupHere": "Registrera dig här",
      "login.error": "Inloggningen misslyckades",
      "signup.title": "Skapa konto",
      "signup.username": "Användarnamn",
      "signup.password": "Lösenord",
      "signup.confirmPassword": "Bekräfta lösenord",
      "signup.submit": "Skapa konto",
      "signup.creating": "Skapar konto...",
      "signup.alreadyHaveAccount": "Har du redan ett konto?",
      "signup.loginHere": "Logga in här",
      "signup.error": "Registreringen misslyckades",
      "signup.passwordsDoNotMatch": "Lösenorden matchar inte",
      "dashboard.title": "Produktöversikt",
      "terms.title": "Villkor",
      "terms.backToLogin": "Stäng och gå tillbaka",
      "terms.content": `<p>GENOM att klicka på Fakturera Nu, väljer du att registrera dig enligt den information som du har skrivit in och texten på registreringssidan och villkoren här, och du accepterar samtidigt villkoren här.</p>
<p>Du kan använda programmet GRATIS i 14 dagar.<br>
123 Fakturera är så enkelt och självförklarande att chansen att du kommer att behöva support är minimal, men om du skulle behöva support, finns vi här för dig, med vårt kontor bemannat för större delen av dagen. Efter provperioden fortsätter prenumerationen och kostar 99 SEK exklusive moms per månad, som faktureras årligen. Om du inte vill behålla programmet, avbryt bara provperioden genom att meddela innan 14 dagar från registreringen.</p>

<p>Du har naturligtvis rätt att avsluta användningen av programmet utan några kostnader, genom att meddela oss per e-post innan 14 dagar från registreringen, att du inte vill fortsätta med programmet, och du betalar då naturligtvis ingenting.<br>
Om vi inte får ett sådant meddelande från dig innan 14 dagar från registreringen, kan beställningen av naturliga skäl inte ändras. Med registrering menas det datum och den tid då du valde att trycka på knappen Fakturera Nu.</p>

<p>Fakturering sker för ett år i taget.<br>
Priset för 123 Fakturera (erbjudandepris 99 kr per månad / ordinarie pris 159 kr per månad) är för årsavgiften Start för ett års användning av programmet.<br>
(Vid användning av erbjudandepriset på 99 kr beräknas ettårsperioden från registreringen.)<br>
Alla priser är exkl. moms.<br>
Erbjudande, Lagerkontroll, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.<br>
Förmedling, liksom fakturering, kan ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. I framtiden kan vi välja att samarbeta med ett annat företag för t.ex. förmedling och fakturering. Kundrelationen är dock med oss. Betalningen görs till det företag från vilket fakturan kommer.<br>
Årsavgiften löper kontinuerligt, men om du inte vill fortsätta använda programmet behöver du bara meddela trettio dagar före starten av nästa ettårsperiod.<br>
Introduktionserbjudandet (99 kr per månad) är för årsavgiften Start för det första året. Efter det första året faktureras det ordinarie priset, vilket för närvarande är, för årsavgift Start, etthundrafemtionio kronor per månad, för årsavgift Fjärrstyrning, trehundra kronor per månad och för årsavgift Pro, trehundratrettiotre kronor per månad. Efter ett år faktureras årsavgiften Fjärrstyrning som standard, men du kan välja Start eller Pro genom att meddela när som helst före förfallodagen.<br>
Om du väljer att behålla programmet genom att inte meddela oss via e-post inom 14 dagar från registreringen att du inte vill fortsätta med programmet, accepterar du att du kommer att betala fakturan för din beställning. Underlåtenhet att betala fakturan eller sen betalning ger inte rätt att avbryta beställningen. Vi hjälper gärna till med logotyp till självkostnadspris.<br>
Licens för användning av 123 Fakturera säljs naturligtvis i enlighet med gällande lagar.<br>
För att kunna hjälpa dig enklare och ge dig support, samt för att följa lagarna, måste vi av naturliga skäl lagra din information.<br>
I samband med lagringen av information kräver lagen att vi ger dig följande information:<br>
Om du beställer som privatperson har du rätt att avbeställa enligt lag. Din information lagras så att vi kan hjälpa dig etc. Vi kommer att använda den för att kunna hjälpa dig om du behöver hjälp, följa lagarna om bokföring etc. När det finns uppgraderingar och liknande kan vi skicka erbjudanden och liknande om våra produkter och tjänster via e-post eller liknande. Du kan bli kontaktad via e-post, post och telefon. Om du inte vill bli kontaktad, skicka bara ett e-postmeddelande om det.<br>
Du kan när som helst be om att inte få information om uppgraderingar via e-post, brev eller liknande, och vi kommer naturligtvis inte att göra det. Du skickar en sådan begäran till oss via e-post, post eller liknande.<br>
Av naturliga skäl måste vi lagra, bearbeta och flytta dina data. Din information lagras tills vidare. Du ger oss tillstånd att lagra, bearbeta och flytta dina data, samt att skicka erbjudanden och liknande via e-post, brev och liknande. På grund av hur det fungerar med programvara behöver tillstånd också ges till andra parter. Tillståndet ges därför till oss, samt till de företag och/eller person(er) som äger programvaran, källkoden, webbplatsen och liknande. Det ges också till nuvarande och framtida företag som ägs och/eller kontrolleras av en eller flera av dem som för närvarande äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida företag som ägs och/eller kontrolleras av en eller flera av dem som för närvarande äger och/eller kontrollerar företagen (om några), som äger eller kommer att äga programvaran, källkoden, webbplatsen och liknande. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer att äga programvaran, källkoden, webbplatsen och liknande. Detta gäller både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom förmedling eller på annat sätt.<br>
Du har naturligtvis rätt att begära tillgång till, ändring och radering av den information vi har om dig. Du har också rätt att begära begränsning av databehandling, och att invända mot databehandling och rätten till dataportabilitet. Du har rätt att klaga till tillsynsmyndigheten. Du kan hitta mer juridisk information om oss <a href="https://online.123fakturera.se/us/?height=864&width=1536" target="_blank" rel="noopener noreferrer" data-width="864" data-height="600">här</a>. Irlands lagar är de tillämpliga lagarna. Att lägga en beställning är naturligtvis helt frivilligt. Vi använder naturligtvis inte någon automatiserad profilering eller beslut.<br>
Om du vill kontakta oss, använd informationen på denna webbplats.<br>
Klicka på Fakturera Nu för att registrera enligt den information du har angett och villkoren här. (Datum och tid för antagning registreras automatiskt i våra register.)<br>
Vår erfarenhet är att våra kunder är mycket nöjda med vårt arbetssätt och hoppas och tror att detta också kommer att bli din upplevelse.<br>
Ha en bra dag!</p>`,
    },
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/translations/${language}`);
        if (response.data.success) {
          // Merge with default translations to ensure we have fallbacks
          setTranslations({
            ...response.data.data,
          });
        } else {
          // Use default translations if API call fails
          // setTranslations(defaultTranslations[language] || {});
        }
      } catch (error) {
        // Use default translations if API call fails
        setTranslations(defaultTranslations[language] || {});
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  const changeLanguage = (lang) => {
    if (lang === "en" || lang === "sv") {
      setLanguage(lang);
      localStorage.setItem("preferredLanguage", lang);
    }
  };

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "sv")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
