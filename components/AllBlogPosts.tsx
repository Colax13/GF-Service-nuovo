
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, TrendingUp, LayoutGrid, ArrowUpRight, Camera } from 'lucide-react';
import { BlogPostData } from './BlogPostDetail';

interface AllBlogPostsProps {
  onShowContact?: () => void;
  onPostSelect?: (post: BlogPostData) => void;
  onShowProjects?: () => void;
}

// Configurazione Paginazione
const ITEMS_PER_PAGE = 5;

// Categorie aggiornate con Tone of Voice professionale
const filters = [
    'Tutti', 
    'News & Trend', 
    'Case History', 
    'Territorio & Radici'
];

// Dati aggiornati: rimossi i post senza contenuto (ID 1, 5, 6)
export const allPosts: BlogPostData[] = [
  {
    id: 7,
    category: "News & Trend",
    title: "BEA 2025: cosa ci insegnano i grandi progetti premiati",
    excerpt: "Il BEA Italia 2025 ha messo sul tavolo un palmarès ricco di insegnamenti concreti. Analisi dei vincitori: Ferrari, Giubileo, Cranchi Yachts e Barilla.",
    date: "12 Giu 2025",
    image: "https://live.staticflickr.com/65535/54943669597_6237b71f01_c.jpg",
    readTime: "7 min",
    content: {
        sections: [
            {
                text: "Il BEA Italia 2025, chiuso a Roma durante la Live Communication Week, ha messo sul tavolo un palmarès ricco di insegnamenti concreti. Oltre ai premi, è una fotografia nitida delle strategie che funzionano oggi negli eventi, dalle scelte creative fino ai dettagli operativi che fanno la differenza tra un appuntamento qualunque e un’esperienza memorabile."
            },
            {
                title: "Ferrari Amalfi World Première: creare mondi, non solo mostrare prodotti",
                text: "Next Group ha dominato con il Grand Prix per la Ferrari Amalfi World Première, premiata anche Best Product Launch e Best Unexpected Use of a Space. Non si trattava di presentare un’auto nuova: era un’esperienza sensoriale che trasformava un luogo qualunque in una dimensione Ferrari, dove ogni elemento – dalla luce alla disposizione degli spazi – contribuiva a una narrazione coerente. Il pubblico non guardava, viveva.\n\n**Un evento non mostra: trasporta.**",
                image: "https://besteventawards.it/wp-content/uploads/2025/11/FerrariAmalfiWorldPremire_eventoImgEvento3.jpg", 
                imageSide: "right"
            },
            {
                title: "Giubileo 2025: un’idea semplice che scala all’infinito",
                text: "Ninetynine si è aggiudicata il Grand Prix Iconic con i Grandi Eventi Giubilari 2025, tra cui il Giubileo dei Giovani con il palco-altare immersivo di 1.400 mq. Un concept spirituale che usava lo spazio fisico per amplificare il messaggio, dimostrando come un’idea chiara possa crescere su scala monumentale senza perdere autenticità. Anche in presenza di decine di migliaia di persone, ogni dettaglio restava al servizio del significato.\n\n**Un’idea forte non ha limiti di scala.**",
                image: "https://besteventawards.it/wp-content/uploads/2025/11/Giubileo2025-GrandiEventi_eventoImgEvento3.jpg",
                imageSide: "left"
            },
            {
                title: "Cranchi Yachts Fuorisalone: il lusso è nei dettagli spaziali",
                text: "Adverteam ha portato a casa 3 medaglie con Immersio Temporis – Cranchi Yachts @Fuorisalone 2025, un’esperienza multisensoriale che fondeva heritage nautico e design contemporaneo. Il pubblico non vedeva barche esposte: percorreva un viaggio dove ogni metro quadro, ogni angolazione, ogni flusso di persone raccontava la marca in modo impeccabile. Lo spazio non era sfondo: era protagonista silenzioso.\n\n**Lo spazio fisico è parte del racconto.**",
                image: "https://besteventawards.it/wp-content/uploads/2025/11/ImmersioTemporis-CranchiYachtsFuorisalone2025_eventoImgEvento1.jpg", 
                imageSide: "right"
            },
            {
                title: "Basil Bar Pesto Barilla: trasformare un prodotto in cultura",
                text: "Sempre Adverteam ha conquistato Oro B2C con Basil Bar by Pesto Barilla, un bistrot immersivo che elevava un alimento quotidiano a esperienza culturale. Non era un semplice assaggio gratuito: era un pezzo di Italia che si poteva toccare con mano, dove layout, materiali e disposizione degli spazi diventavano strumenti per comunicare tradizione e identità. Il food non era solo cibo, ma narrazione.\n\n**Un prodotto diventa esperienza se lo spazio lo sostiene.**",
                image: "https://besteventawards.it/wp-content/uploads/2025/11/BasilBarbyPestoBarilla_eventoImgEvento1.jpg",
                imageSide: "left"
            },
            {
                title: "Conclusione",
                text: "Quello che emerge dal BEA 2025 è un settore maturo, dove creatività, tecnologia e strategia vivono insieme solo se ancorate a un’idea forte. Gli eventi premiati non sono one shot spettacolari, ma ecosistemi pensati per lasciare un segno, dove ogni elemento – dal concept agli spazi fisici – lavora per lo stesso obiettivo.\n\n**GF Service legge in questi progetti la conferma del proprio ruolo:** fornire strutture che non si limitano a ospitare l’evento, ma lo rendono concreto e possibile."
            }
        ]
    }
  },
  {
    id: 8,
    category: "Territorio & Radici",
    title: "Borghi in Festa: il Capodanno che ha ridato vita a Vallepietra",
    excerpt: "Immagina un borgo di 400 anime che sfida l'inverno. Il racconto di come una tendostruttura ha trasformato una piazza in pendenza in una sala da ballo per la comunità.",
    date: "05 Gen 2025",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203050/Picinisco-1_irrxjh.jpg",
    readTime: "6 min",
    content: {
        sections: [
          {
            text: "Immagina un borgo di appena 400 anime, aggrappato ai Monti Simbruini, dove l’inverno porta silenzio e molti giovani scelgono la città. **Vallepietra, piccolo centro della Ciociaria**, ha deciso di andare controcorrente.\n\nPer la seconda edizione del Capodanno Vallepietrano (31 dicembre 2024), Piazza Italia si è riempita di calore, musica e convivialità, accogliendo circa 50 persone riunite per cenare e festeggiare insieme."
          },
          {
            title: "Dall'esperimento alla tradizione",
            text: "Non era più un esperimento. Dopo il successo della prima edizione, il paese ha scelto di trasformare l’evento in una tradizione.\n\nGF Service ha risposto con una **tendostruttura da 200 mq, due cannoni riscaldanti, 30 tavoli e 150 sedie**, trasformando la piazza in una vera e propria sala accogliente e viva. Le immagini parlano da sole: tavoli rossi apparecchiati, palco illuminato, persone che ballano e brindano fino a notte fonda.",
            image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767310041/605760077_122185477238448864_5147057568440744254_n_djnwhq.jpg", 
            imageSide: "right"
          },
          {
            title: "La sfida logistica: vicoli e pendenze",
            text: "Portare tutto questo nel cuore del borgo non è stato semplice. Piazza Italia presenta una leggera pendenza per lo scolo dell’acqua e accessi stretti, incastonati tra vicoli che non perdonano mezzi ingombranti.\n\nÈ stato quindi necessario utilizzare un **camion di piccole dimensioni**, entrare in retromarcia fino all’imbocco, scaricare rapidamente lasciando libero il passaggio ai pedoni e montare ogni elemento con precisione millimetrica per garantire il perfetto livellamento della struttura.\n\nI lavori sono iniziati il 23 dicembre, sotto un freddo secco ma gestibile, e si sono conclusi con calma il 5 gennaio. Nessuna fretta, nessun intoppo: la piazza è stata allestita senza mai disturbare la vita del borgo.",
            image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203566/camion_z0qlfj.png", 
            imageSide: "left"
          },
          {
            title: "Il valore sociale",
            text: "Quelle 50 persone – circa il 12% della popolazione – non erano semplici commensali. Erano una comunità che sceglie di ritrovarsi.\n\nUna cena che riempie ristoranti solitamente vuoti d’inverno, musica che ridà voce a vicoli silenziosi, una notte capace di dare respiro all’economia locale e rafforzare i legami. La Pro Loco parla già di una terza edizione, ed è forse questo il vero miracolo.\n\n**GF Service non ha semplicemente montato una struttura**: ha contribuito alla nascita di una tradizione che contrasta lo spopolamento, guarda al futuro e dimostra che anche nei centri storici più complessi si può generare rinascita. Vallepietra ce lo ha insegnato.",
             image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767310038/605887278_122185477274448864_6400889896911390130_n_efa17m.jpg",
            imageSide: "right"
          }
        ]
    }
  },
  {
    id: 3,
    category: "Case History",
    title: "Mercatini di Natale a Porta di Roma: montare la magia senza fermare la città",
    excerpt: "Porta di Roma non si ferma mai. Come abbiamo montato un intero villaggio natalizio lavorando solo di notte per non interrompere il flusso di migliaia di visitatori.",
    date: "15 Nov 2024",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
    readTime: "5 min",
    content: {
        sections: [
            {
                text: "Porta di Roma, uno dei centri commerciali più frequentati del quadrante nord della Capitale, non si ferma mai.\n\nDal 10 novembre 2024 al 6 gennaio 2025, i piazzali esterni davanti a Decathlon, Ikea e Leroy Merlin si sono trasformati in un **villaggio natalizio fatto di luci, profumo di cannella e casette di legno**.\n\nMercatini di Natale, pista di pattinaggio e animazioni domenicali per famiglie hanno animato l’area per quasi due mesi, con migliaia di visitatori ogni weekend, negozi sempre aperti e una città che continua a muoversi."
            },
            {
                title: "La sfida: lavorare mentre la città dorme",
                text: "Organizzare un mercatino in un contesto come questo significa accettare un vincolo non negoziabile: **il flusso non può essere interrotto**.\n\nGF Service ha raccolto la sfida montando tutte le casette in sole tre notti, lavorando esclusivamente **dalle 22:00 alle 08:00**, senza interferire con un solo cliente o con le attività commerciali.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767371665/20251106_004635_jhvhuk.jpg",
                imageSide: "right"
            },
            {
                title: "Tre notti per non fermare Roma",
                text: "Il piano operativo era chirurgico. Obiettivo: completare il montaggio in due notti anziché tre.\n\n**Notte 1.** Arrivo puntuale, squadre suddivise per compiti chiari. Il carico sul camion era studiato al dettaglio: solo il materiale necessario per quella notte, nessuno spreco. Scarico e montaggio organizzati per blocchi, con casette pronte una dopo l’altra, in modo progressivo e senza intoppi.\n\n**Notte 2.** Stesso ritmo, precisione assoluta. Entro le 08:00 il piazzale era pulito e perfettamente ordinato, come se nulla fosse accaduto. I clienti sono arrivati per lo shopping natalizio trovando il mercatino già vivo e operativo.\n\nPianificazione iniziale, logistica coordinata e montaggio sequenziale hanno permesso di chiudere in anticipo, lasciando l’area impeccabile e completamente funzionale.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767371682/20251107_041535_zosutg.jpg",
                imageSide: "left"
            },
            {
                title: "La magia senza intoppi",
                text: "Il risultato è stato evidente: un villaggio natalizio capace di incantare famiglie intere, con stand artigianali, gastronomia italiana e una pista di pattinaggio davanti a Leroy Merlin.\n\nAnimazioni con mascotte, bolle di sapone e Babbo Natale hanno animato le domeniche, il tutto senza che un solo negozio chiudesse, nemmeno per un minuto.\n\nIn un luogo come Porta di Roma, dove il traffico umano e commerciale non si arresta mai, questo è il massimo risultato possibile: **accendere la magia del Natale senza spegnere la città**.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg",
                imageSide: "right"
            },
            {
                title: "Costruire senza intralciare",
                text: "Lavorare di notte per non disturbare il giorno. Precisione operativa al servizio della vita quotidiana.\n\nÈ questo l’approccio che GF Service porta nei grandi progetti: creare spazi di aggregazione senza interferire con chi quei luoghi li vive ogni giorno. Porta di Roma lo ha ricordato chiaramente: **la vera professionalità è rendere possibile un evento senza farsi notare**."
            }
        ],
        gallery: [
             "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
             "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739408566_ewgmpq.jpg",
             "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016453/1765739385298_i6e0d3.jpg",
             "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg"
        ]
    }
  },
  {
    id: 2,
    category: "News & Trend",
    title: "Sostenibilità negli allestimenti: il futuro è modulare.",
    subtitle: "Perché progettare strutture riutilizzabili è l'unica vera scelta ecologica per gli eventi temporanei.",
    excerpt: "Perché le strutture temporanee sono la scelta più ecologica per i grandi eventi. Analisi dei materiali, riutilizzo delle componenti e riduzione dell'impatto ambientale nei festival moderni.",
    date: "21 Ott 2025",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png",
    readTime: "6 min",
    content: {
        sections: [
            {
                title: "Introduzione: perché parlarne ora",
                text: "Negli eventi temporanei la parola “sostenibilità” rischia spesso di essere uno slogan.\n\nEppure è proprio qui, negli allestimenti che nascono e scompaiono in pochi giorni, che si gioca una parte importante dell’impatto ambientale: materiali usati una sola volta, sprechi di risorse, trasporti pesanti, smontaggi complessi.\n\nL’alternativa esiste già, ed è più concreta di quanto sembri: **progettare allestimenti modulari, riutilizzabili e riconfigurabili**, pensati per vivere molti eventi diversi invece di un solo appuntamento."
            },
            {
                title: "Cosa significa “modulare” negli allestimenti",
                text: "Un allestimento modulare non è solo “smontabile”.\n\nÈ un sistema di strutture, tavoli, pedane, casette, transenne e coperture che può essere ricomposto in configurazioni diverse a seconda del tipo di evento, dello spazio e del numero di persone attese.\n\nIn pratica, lo stesso kit di attrezzature può diventare:\n\n• Una sagra di paese un weekend;\n• Un festival della birra il mese successivo;\n• Un mercatino di Natale in inverno, con una disposizione completamente diversa.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png",
                imageSide: "left"
            },
            {
                title: "Perché il futuro è modulare (e non solo greenwashing)",
                text: "La modularità è sostenibile perché lavora su tre livelli contemporaneamente:\n\n**Ambientale**: meno strutture “usa e getta”, più elementi riutilizzati decine di volte, minore produzione di rifiuti.\n\n**Logistico**: montaggi e smontaggi più rapidi, meno mezzi coinvolti, meno viaggi, meno ore di lavoro sprecate.\n\n**Economico**: gli organizzatori possono investire su eventi ricorrenti sapendo che le stesse strutture si adattano a formati diversi nel tempo.\n\nNon si tratta solo di usare materiali “green”, ma di cambiare il modo in cui si pensa lo spazio: da soluzione “una tantum” a infrastruttura temporanea che torna utile, stagione dopo stagione."
            },
            {
                title: "Dal kit alla comunità",
                text: "Per sagre, fiere e mercatini di Natale, la scelta di strutture modulari ha un impatto diretto sulla vita dei territori.\n\nI comuni possono ripensare la stessa piazza più volte l’anno, senza dover ricominciare da zero a ogni evento. Le Pro Loco e le associazioni riducono sprechi e costi, mantenendo standard più alti di sicurezza e ordine degli spazi.\n\nUn set di casette in legno, kit da birreria e tendostrutture ben progettato può accompagnare un territorio lungo l’intero calendario: primavera di feste locali, estate di festival, inverno di mercatini.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
                imageSide: "left"
            },
            {
                title: "Il ruolo di chi noleggia strutture",
                text: "Per chi noleggia strutture e allestimenti, la sostenibilità non è solo una voce in più sul sito.\n\nSignifica progettare il proprio magazzino come un sistema modulare: casette che si adattano a contesti diversi, kit che funzionano tanto in un borgo quanto in un centro commerciale, tendostrutture che cambiano configurazione senza dover ripartire da zero ogni volta.\n\nIn questo modo, ogni evento diventa meno “usa e getta” e più parte di un ciclo: ciò che oggi ospita una festa patronale, domani può diventare un villaggio natalizio o un festival enogastronomico, con lo stesso hardware ma una storia diversa da raccontare.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203566/camion_z0qlfj.png",
                imageSide: "right"
            }
        ],
        gallery: [
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427546/palchetto_2_pzbl66.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203566/camion_z0qlfj.png"
        ]
    }
  },
  {
    id: 4,
    category: "Territorio & Radici",
    title: "Palio di San Pietro Eremita",
    subtitle: "Quando un borgo di 2.000 abitanti riceve 10.000 persone",
    excerpt: "Come supportiamo le feste storiche della Ciociaria. La sfida di integrare strutture moderne di sicurezza in contesti medievali senza intaccarne il fascino storico.",
    date: "10 Ago 2025",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg",
    readTime: "8 min",
    content: {
        sections: [
            {
                text: "A Trevi nel Lazio, piccolo centro della Ciociaria affacciato sui Monti Simbruini, la fine dell'estate ha un suono preciso: **quello degli zoccoli di cavallo** che attraversano il corso principale del paese.\n\nÈ il Palio di San Pietro Eremita, una tradizione lunga anni, che ogni 31 Agosto riporta migliaia di persone per le vie del borgo. Nel 2025 **le presenze hanno superato le 10.000 persone**, un numero che racconta da solo la portata di un evento che permette al paesino di quintuplicare la vita nelle sue strade.\n\nMa oltre i numeri, il Palio è una storia che tiene insieme fede e appartenenza.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_2_aygjdp.jpg",
                imageSide: "right"
            },
            {
                title: "Una storia che tiene insieme fede e appartenenza.",
                text: "Il Palio nasce come omaggio al patrono del paese, San Pietro Eremita, figura religiosa venerata sin dal Medioevo. Oggi è una sfida tra otto contrade (Civita, Rivo, Cunicella, Suria, Santo Nicola, Borgo Madonna, Piajo e Cinarzo) che si contendono un drappo e **l'orgoglio di rappresentare la propria parte di Trevi**.\n\nPer chi partecipa, non è solo una corsa: è il momento in cui ogni rione sente di rappresentare Trevi intera.\n\nNei giorni che precedono la corsa il paese cambia volto: le bandiere colorano i balconi e vengono allestiti stand di Food & Beverage.\nIl Palio è **un rito collettivo che unisce generazioni e ruoli diversi**: bambini, anziani, visitatori, volontari e tecnici.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg",
                imageSide: "left"
            },
            {
                title: "Un impatto che va oltre la festa",
                text: "Per un borgo di 2.000 abitanti, un evento come il Palio **significa molto più di una tradizione che resiste nel tempo**. Significa turismo, visibilità, sostegno all'economia locale.\nRistoranti e bar lavorano a pieno ritmo, i negozi restano aperti fino a tardi e le strutture ricettive registrano il tutto esaurito.\n\nMa soprattutto, il **paese ritrova una vitalità** e una dimensione di comunità che spesso si perde durante l'anno.\nÈ la prova di come anche un evento locale, quando ben organizzato, abbia **un valore strategico nel tessuto sociale e culturale di un territorio**.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_3_oabv1e.jpg",
                imageSide: "right"
            },
            {
                title: "Il ruolo di GF Service",
                text: "In occasione di questo evento, **GF Service ha contribuito alla riuscita** fornendo transenne, tavoli, panche e gazebi destinate alle aree di supporto, accoglienza e sicurezza.\n\nIl montaggio è stato effettuato nelle poche ore disponibili la mattina dell’evento e lo smontaggio subito dopo la corsa, liberando il corso in tempi stretti e in sicurezza.\n\nÈ un intervento forse poco visibile al pubblico, ma decisivo per gestire in sicurezza un flusso di oltre 10.000 persone.\nEd è proprio questo tipo di lavoro che racconta la filosofia dell’azienda: **essere parte del territorio**, sostenendone la vitalità culturale e il valore delle tradizioni locali.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg",
                imageSide: "left"
            }
        ],
        gallery: [
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_2_aygjdp.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_3_oabv1e.jpg"
        ]
    }
  }
];

const AllBlogPosts: React.FC<AllBlogPostsProps> = ({ onPostSelect, onShowProjects }) => {
    const [loaded, setLoaded] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Tutti');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    // Reset page to 1 when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        if (activeCategory === 'Tutti') return allPosts;
        return allPosts.filter(post => post.category === activeCategory);
    }, [activeCategory]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const currentPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredPosts.slice(startIndex, endIndex);
    }, [currentPage, filteredPosts]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const element = document.getElementById('blog-top-anchor');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const recommendedPosts = allPosts.filter(p => p.category === 'Case History' || p.category === 'Territorio & Radici').slice(0, 3);

    return (
        <section className="relative pt-32 pb-24 min-h-screen bg-gf-darker selection:bg-gf-green selection:text-white">
             
             {/* Unified Background Ambience */}
             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                 <div className="absolute top-[-10%] -right-[10%] w-[60vw] h-[60vw] bg-gf-green/10 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                 <div className="absolute bottom-[10%] -left-[10%] w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[100px] opacity-30"></div>
                 
                 {/* Gradient to match other pages */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/90 to-[#022c24]/95"></div>

                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
             </div>

             <div className="relative z-10 container mx-auto px-6">
                 
                 {/* 1. CENTERED HEADER */}
                 <div className={`text-center mb-16 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                        <BookOpen size={12} className="text-gf-green" />
                        Blog & News
                    </div>
                    {/* Enlarged Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
                        LE NOSTRE <span className="font-serif italic text-gf-green font-light">STORIE</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        Approfondimenti e racconti diretti dai nostri cantieri in tutta Italia.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN: MAIN CONTENT (Sticky Menu + Articles) --- */}
                    <div className="lg:col-span-8" id="blog-top-anchor">
                        
                        {/* STICKY MENU BAR */}
                        <div className={`sticky top-24 z-30 transition-all duration-500 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                             <div className="bg-gf-darker/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 mb-10 shadow-2xl inline-flex max-w-full overflow-hidden">
                                <div className="flex overflow-x-auto gap-1 scrollbar-hide no-scrollbar items-center">
                                    {filters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveCategory(filter)}
                                            className={`
                                                px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap
                                                ${activeCategory === filter 
                                                    ? 'bg-gf-green text-white shadow-lg' 
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* ARTICLES FEED */}
                        <div className="flex flex-col gap-8 min-h-[50vh]">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post, idx) => (
                                    <article 
                                        key={post.id} 
                                        onClick={() => onPostSelect?.(post)}
                                        className={`group relative flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-gf-green/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gf-green/5 cursor-pointer ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                        style={{ transitionDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Image Section */}
                                        <div className="md:w-2/5 relative h-[250px] md:h-auto overflow-hidden">
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${post.image})` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-60 md:hidden"></div>
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:w-3/5 p-8 flex flex-col justify-center bg-gf-darker/30 backdrop-blur-sm relative border-l border-white/5">
                                            
                                            <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                <span>{post.readTime} Lettura</span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gf-green transition-colors">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto">
                                                <button className="text-white text-xs font-bold uppercase tracking-widest hover:text-gf-green transition-colors flex items-center gap-2 group/btn">
                                                    Leggi articolo <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                    <p className="text-gray-400 font-light">Nessun articolo trovato in questa categoria.</p>
                                    <button 
                                        onClick={() => setActiveCategory('Tutti')}
                                        className="mt-4 text-gf-green text-sm font-bold uppercase tracking-widest hover:underline"
                                    >
                                        Mostra tutti
                                    </button>
                                </div>
                            )}

                             {/* Pagination (Dynamic) */}
                             {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12 transition-all duration-500 ease-out">
                                    <button 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`
                                                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all
                                                ${currentPage === page 
                                                    ? 'bg-white text-gf-darker scale-105 shadow-lg' 
                                                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className={`sticky top-32 flex flex-col gap-10 transition-all duration-1000 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            
                            {/* WIDGET 1: CONSIGLIATI (Redesign Editoriale) */}
                            <div className="bg-gf-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp size={18} className="text-gf-green" />
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">In Evidenza</h4>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gf-green"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {recommendedPosts.map((post, idx) => (
                                        <div 
                                            key={`rec-${post.id}`} 
                                            onClick={() => onPostSelect?.(post)}
                                            className="group relative p-6 cursor-pointer hover:bg-white/[0.02] transition-colors overflow-hidden"
                                        >
                                            {/* Big Number Background */}
                                            <span className="absolute -top-2 -right-2 text-7xl font-black text-white/[0.03] group-hover:text-gf-green/10 transition-colors z-0 select-none">
                                                0{idx + 1}
                                            </span>
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest mb-2 text-gf-green">
                                                    {post.category}
                                                </div>
                                                <h5 className="text-base font-bold text-white leading-snug group-hover:text-gf-green transition-colors mb-3 pr-4">
                                                    {post.title}
                                                </h5>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gf-green transition-colors"></span>
                                                    {post.readTime} lettura
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* WIDGET 2: PROJECTS PROMO (Redesign Poster/Card) */}
                            <div className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                {/* Image Background */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    style={{ backgroundImage: 'url("https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766431972/sora-tavolata-22-xq-1_gei6bz.jpg")' }}
                                ></div>
                                
                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                                {/* Top Badge */}
                                <div className="absolute top-6 left-6 z-20">
                                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
                                        <Camera size={12} className="text-gf-green" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Portfolio 2025</span>
                                     </div>
                                </div>

                                {/* Content Bottom Panel (Glassmorphism) */}
                                <div className="absolute bottom-0 left-0 w-full p-2 z-20">
                                    <div className="bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">I Nostri Lavori</div>
                                                <h4 className="text-xl font-bold text-white leading-none uppercase">Eccellenza<br/><span className="text-gf-green italic font-serif">Tecnica</span></h4>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-300">
                                                <LayoutGrid size={18} />
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => onShowProjects?.()}
                                            className="w-full py-3 bg-white text-black hover:bg-gf-green hover:text-white transition-colors rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn"
                                        >
                                            Esplora Portfolio <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                 </div>
             </div>
             
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
             `}</style>
        </section>
    );
}

export default AllBlogPosts;
