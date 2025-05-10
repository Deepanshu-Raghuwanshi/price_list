const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

class Translation {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        language VARCHAR(10) NOT NULL,
        key VARCHAR(255) NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(language, key)
      )
    `;

    try {
      await pool.query(createTableQuery);
      console.log("Translations table created successfully");

      // Insert default translations
      await this.seedDefaultTranslations();
    } catch (error) {
      console.error("Error creating translations table:", error);
      throw error;
    }
  }

  static async seedDefaultTranslations() {
    const defaultTranslations = [
      // English translations
      { language: "en", key: "login.title", value: "Login" },
      { language: "en", key: "login.username", value: "Username" },
      { language: "en", key: "login.password", value: "Password" },
      { language: "en", key: "login.submit", value: "Login" },
      { language: "en", key: "login.loggingIn", value: "Logging in..." },
      {
        language: "en",
        key: "login.noAccount",
        value: "Don't have an account?",
      },
      { language: "en", key: "login.signupHere", value: "Sign up here" },
      { language: "en", key: "login.error", value: "Login failed" },
      { language: "en", key: "login.viewTerms", value: "View Terms" },

      // Signup translations - English
      { language: "en", key: "signup.title", value: "Create Account" },
      { language: "en", key: "signup.username", value: "Username" },
      { language: "en", key: "signup.password", value: "Password" },
      {
        language: "en",
        key: "signup.confirmPassword",
        value: "Confirm Password",
      },
      { language: "en", key: "signup.submit", value: "Create Account" },
      { language: "en", key: "signup.creating", value: "Creating Account..." },
      {
        language: "en",
        key: "signup.alreadyHaveAccount",
        value: "Already have an account?",
      },
      { language: "en", key: "signup.loginHere", value: "Login here" },
      { language: "en", key: "signup.error", value: "Signup failed" },
      {
        language: "en",
        key: "signup.passwordsDoNotMatch",
        value: "Passwords do not match",
      },

      { language: "en", key: "dashboard.title", value: "Product Dashboard" },
      { language: "en", key: "product.create", value: "Create Product" },
      { language: "en", key: "product.articleNumber", value: "Article Number" },
      { language: "en", key: "product.name", value: "Product/Service" },
      { language: "en", key: "product.inPrice", value: "In Price" },
      { language: "en", key: "product.price", value: "Price" },
      { language: "en", key: "product.unit", value: "Unit" },
      { language: "en", key: "product.inStock", value: "In Stock" },
      { language: "en", key: "product.description", value: "Description" },
      { language: "en", key: "product.save", value: "Save" },
      { language: "en", key: "product.cancel", value: "Cancel" },
      { language: "en", key: "product.edit", value: "Edit" },
      { language: "en", key: "product.delete", value: "Delete" },
      {
        language: "en",
        key: "product.noProducts",
        value: "No products found. Create your first product!",
      },
      { language: "en", key: "common.logout", value: "Logout" },

      // Terms translations - English
      { language: "en", key: "terms.title", value: "Terms" },
      { language: "en", key: "terms.backToLogin", value: "Close and Go Back" },
      {
        language: "en",
        key: "terms.content",
        value: `<p>BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.</p>
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

      // Swedish translations
      { language: "sv", key: "login.title", value: "Logga in" },
      { language: "sv", key: "login.username", value: "Användarnamn" },
      { language: "sv", key: "login.password", value: "Lösenord" },
      { language: "sv", key: "login.submit", value: "Logga in" },
      { language: "sv", key: "login.loggingIn", value: "Loggar in..." },
      {
        language: "sv",
        key: "login.noAccount",
        value: "Har du inget konto?",
      },
      { language: "sv", key: "login.signupHere", value: "Registrera dig här" },
      {
        language: "sv",
        key: "login.error",
        value: "Inloggningen misslyckades",
      },
      { language: "sv", key: "login.viewTerms", value: "Visa villkor" },

      // Signup translations - Swedish
      { language: "sv", key: "signup.title", value: "Skapa konto" },
      { language: "sv", key: "signup.username", value: "Användarnamn" },
      { language: "sv", key: "signup.password", value: "Lösenord" },
      {
        language: "sv",
        key: "signup.confirmPassword",
        value: "Bekräfta lösenord",
      },
      { language: "sv", key: "signup.submit", value: "Skapa konto" },
      { language: "sv", key: "signup.creating", value: "Skapar konto..." },
      {
        language: "sv",
        key: "signup.alreadyHaveAccount",
        value: "Har du redan ett konto?",
      },
      { language: "sv", key: "signup.loginHere", value: "Logga in här" },
      {
        language: "sv",
        key: "signup.error",
        value: "Registreringen misslyckades",
      },
      {
        language: "sv",
        key: "signup.passwordsDoNotMatch",
        value: "Lösenorden matchar inte",
      },

      { language: "sv", key: "dashboard.title", value: "Produktöversikt" },
      { language: "sv", key: "product.create", value: "Skapa produkt" },
      {
        language: "sv",
        key: "product.articleNumber",
        value: "Artikelnummer",
      },
      { language: "sv", key: "product.name", value: "Produkt/Tjänst" },
      { language: "sv", key: "product.inPrice", value: "Inpris" },
      { language: "sv", key: "product.price", value: "Pris" },
      { language: "sv", key: "product.unit", value: "Enhet" },
      { language: "sv", key: "product.inStock", value: "I lager" },
      { language: "sv", key: "product.description", value: "Beskrivning" },
      { language: "sv", key: "product.save", value: "Spara" },
      { language: "sv", key: "product.cancel", value: "Avbryt" },
      { language: "sv", key: "product.edit", value: "Redigera" },
      { language: "sv", key: "product.delete", value: "Ta bort" },
      {
        language: "sv",
        key: "product.noProducts",
        value: "Inga produkter hittades. Skapa din första produkt!",
      },
      { language: "sv", key: "common.logout", value: "Logga ut" },

      // Terms translations - Swedish
      { language: "sv", key: "terms.title", value: "Villkor" },
      {
        language: "sv",
        key: "terms.backToLogin",
        value: "Stäng och gå tillbaka",
      },
      {
        language: "sv",
        key: "terms.content",
        value: `<p>GENOM att klicka på Fakturera Nu, väljer du att registrera dig enligt den information som du har skrivit in och texten på registreringssidan och villkoren här, och du accepterar samtidigt villkoren här.</p>
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
    ];

    try {
      // Use a transaction to ensure all translations are inserted
      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        for (const translation of defaultTranslations) {
          const query = `
            INSERT INTO translations (language, key, value)
            VALUES ($1, $2, $3)
            ON CONFLICT (language, key) DO NOTHING
          `;
          await client.query(query, [
            translation.language,
            translation.key,
            translation.value,
          ]);
        }

        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }

      console.log("Default translations seeded successfully");
    } catch (error) {
      console.error("Error seeding default translations:", error);
      throw error;
    }
  }

  static async getByLanguage(language) {
    try {
      const query = "SELECT key, value FROM translations WHERE language = $1";
      const { rows } = await pool.query(query, [language]);

      // Convert to a key-value object
      const translations = {};
      rows.forEach((row) => {
        translations[row.key] = row.value;
      });

      return translations;
    } catch (error) {
      console.error("Error getting translations:", error);
      throw error;
    }
  }

  static async updateTranslation(language, key, value) {
    try {
      const query = `
        INSERT INTO translations (language, key, value)
        VALUES ($1, $2, $3)
        ON CONFLICT (language, key) 
        DO UPDATE SET value = $3, updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;

      const { rows } = await pool.query(query, [language, key, value]);
      return rows[0];
    } catch (error) {
      console.error("Error updating translation:", error);
      throw error;
    }
  }
}

module.exports = Translation;
