import { Memory } from '../types/galaxy';

export const AVAILABLE_PHOTOS = [
  '/assets/aistudio/jess13_ad180d37.jpg',
  '/assets/aistudio/jess12_85a1a381.jpg',
  '/assets/aistudio/jess9_68ce4276.jpg',
  '/assets/aistudio/jess2_c6721b3c.jpg',
  '/assets/aistudio/jess6_0428721e.jpg',
  '/assets/aistudio/jess3_e90783af.jpg',
  '/assets/aistudio/jess14_4bb33e28.jpg',
  '/assets/aistudio/jess4_7d843509.jpg',
  '/assets/aistudio/jess16_2666fdf9.jpg',
  '/assets/aistudio/jess20_21a483ff.jpg',
  '/assets/aistudio/jess19_a02ea029.jpg',
  '/assets/aistudio/jess23_f4b16d3a.jpg',
  '/assets/aistudio/jess7_73770d99.jpg',
  '/assets/aistudio/jess8_aca7e7fe.jpg',
  '/assets/aistudio/jess18_c68bb516.jpg',
  '/assets/aistudio/jess17_40f1010b.jpg',
  '/assets/aistudio/jess11_5b09cd2f.jpg',
  '/assets/aistudio/jess15_9ab0c00b.jpg'
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    title: 'Llamadas de Medianoche',
    date: 'Constelación Alfa · Órbita 01',
    description: 'Esas llamadas nocturnas donde el cansancio vencía pero ninguno de los dos quería colgar. Tu sonrisa al otro lado de la pantalla siempre tenía el poder de iluminar el día entero.',
    image: '/assets/aistudio/jess13_ad180d37.jpg',
    x: 14,
    y: 22,
    category: 'Llamadas',
    notes: 'Incontables horas compartiendo anécdotas antes de dormir.'
  },
  {
    id: 'mem-2',
    title: 'Reconectando Siempre',
    date: 'Constelación Alfa · Órbita 02',
    description: 'Incluso cuando la señal decía "Reconectando", la complicidad nunca se pausó ni un segundo. No importaba la distancia, siempre encontrábamos la manera de estar presentes.',
    image: '/assets/aistudio/jess2_c6721b3c.jpg',
    x: 28,
    y: 16,
    category: 'Llamadas',
    notes: 'Auriculares puestos y pláticas interminables.'
  },
  {
    id: 'mem-3',
    title: 'Ocurrencias y Caras Graciosas',
    date: 'Nebulosa Risas · Órbita 03',
    description: 'Tus ocurrencias espontáneas y las caras más chistosas en cada videollamada. Solo tú tienes esa chispa natural para hacerme reír a carcajadas sin importar cómo haya ido el día.',
    image: '/assets/aistudio/jess9_68ce4276.jpg',
    x: 42,
    y: 20,
    category: 'Risas',
    notes: 'Momentos auténticos sin poses.'
  },
  {
    id: 'mem-4',
    title: 'Confianza Sin Filtros',
    date: 'Nebulosa Risas · Órbita 04',
    description: 'La bendición de una amistad tan sincera donde no hacen falta máscaras ni apariencias: despeinados, con sueño, contando tonterías con la mayor naturalidad del universo.',
    image: '/assets/aistudio/jess14_4bb33e28.jpg',
    x: 18,
    y: 38,
    category: 'Risas',
    notes: 'La libertad de ser completamente nosotros mismos.'
  },
  {
    id: 'mem-5',
    title: 'Historial de Complicidad (Jess <3)',
    date: 'Sector Frecuencia · Órbita 05',
    description: 'Cinco llamadas seguidas en 25 minutos porque un solo chisme o detalle nunca cabía en una sola plática. "Jess <3" en el registro de llamadas siempre fue sinónimo de buenas historias.',
    image: '/assets/aistudio/jess15_9ab0c00b.jpg',
    x: 32,
    y: 35,
    category: 'Llamadas',
    notes: 'Cuando cinco llamadas consecutivas aún se sentían cortas.'
  },
  {
    id: 'mem-6',
    title: 'Tardes Soleadas en el Campus',
    date: 'Vía Láctea · Órbita 06',
    description: 'Caminar entre clases, sentarse bajo el sol y compartir risas sinceras con amigos que dejan huella. Esos días que parecían simples se convirtieron en recuerdos dorados para siempre.',
    image: '/assets/aistudio/jess4_7d843509.jpg',
    x: 12,
    y: 58,
    category: 'Aventuras',
    notes: 'Recuerdos de días que construyeron grandes lazos.'
  },
  {
    id: 'mem-7',
    title: 'Equipo de Aventuras',
    date: 'Vía Láctea · Órbita 07',
    description: 'Gorra, tenis y la mejor actitud para explorar cualquier rincón del mundo. Cada salida a tu lado era una garantía de pasarla increíble y volver con mil anécdotas.',
    image: '/assets/aistudio/jess7_73770d99.jpg',
    x: 26,
    y: 66,
    category: 'Aventuras',
    notes: 'Compañeros de ruta en los mejores días.'
  },
  {
    id: 'mem-8',
    title: 'Locura Compartida',
    date: 'Cúmulo Alegría · Órbita 08',
    description: 'Porque con los verdaderos amigos nunca hay fotos aburridas. Una mueca, la lengua afuera y esa vibra única que hace que cualquier momento común se vuelva inolvidable.',
    image: '/assets/aistudio/jess18_c68bb516.jpg',
    x: 20,
    y: 82,
    category: 'Risas',
    notes: 'Sonrisas espontáneas que quedan grabadas.'
  },
  {
    id: 'mem-9',
    title: 'Tardes de Boba y Antojos',
    date: 'Estación Dulzura · Órbita 09',
    description: 'Pausa obligatoria para disfrutar un buen bubble tea, refrescarse y charlar de todo y de nada. Esos pequeños gustos compartidos que hacen la vida mucho más rica y ligera.',
    image: '/assets/aistudio/jess6_0428721e.jpg',
    x: 38,
    y: 78,
    category: 'Momentos',
    notes: 'Placeres cotidianos con la mejor compañía.'
  },
  {
    id: 'mem-10',
    title: 'Magia de Otoño',
    date: 'Nebulosa Dorada · Órbita 10',
    description: 'Una de tus fotos más hermosas y artísticas. Cubriendo tu rostro con una hoja de otoño pero dejando ver esa mirada y luz especial que siempre transmites a quienes te rodean.',
    image: '/assets/aistudio/jess11_5b09cd2f.jpg',
    x: 52,
    y: 85,
    category: 'Especial',
    notes: 'Una mirada que refleja la nobleza de tu corazón.'
  },
  {
    id: 'mem-11',
    title: 'Estilo y Sonrisas al Espejo',
    date: 'Sector Glamour · Órbita 11',
    description: 'Ese momento de complicidad frente al espejo antes de salir: probando lentes oscuros, retocando detalles y asegurándonos de que íbamos a conquistar el lugar.',
    image: '/assets/aistudio/jess16_2666fdf9.jpg',
    x: 65,
    y: 80,
    category: 'Momentos',
    notes: 'El estilo intacto y la diversión asegurada.'
  },
  {
    id: 'mem-12',
    title: 'Filtro de Perrito y Café',
    date: 'Cúmulo Alegría · Órbita 12',
    description: 'La foto obligatoria con el filtro de perrito dálmata. Risas de sobremesa, bromas y la comodidad de compartir un momento relajado con alguien que aprecias con el corazón.',
    image: '/assets/aistudio/jess20_21a483ff.jpg',
    x: 80,
    y: 72,
    category: 'Risas',
    notes: 'Clásicos recuerdos llenos de frescura.'
  },
  {
    id: 'mem-13',
    title: 'La Mejor Barba de la Galaxia',
    date: 'Nebulosa Risas · Órbita 13',
    description: 'Llorando de risa probando los filtros más locos de Instagram. Tu buen humor, tu carisma y esa risa contagiosa son de las cosas más valiosas que tienes.',
    image: '/assets/aistudio/jess17_40f1010b.jpg',
    x: 88,
    y: 54,
    category: 'Risas',
    notes: 'La risa como remedio infalible para el alma.'
  },
  {
    id: 'mem-14',
    title: 'En el Centro del Corazón',
    date: 'Santuario Afecto · Órbita 14',
    description: 'Enmarcados en ese corazón gigante afuera del cine. Un símbolo perfecto para representar lo mucho que te quiero, el enorme aprecio que te tengo y lo agradecido que estoy por tu amistad.',
    image: '/assets/aistudio/jess19_a02ea029.jpg',
    x: 84,
    y: 36,
    category: 'Especial',
    notes: 'Un lugar especial en mi historia y en mi corazón.'
  },
  {
    id: 'mem-15',
    title: 'Noche de Gala y Elegancia',
    date: 'Constelación Real · Órbita 15',
    description: 'Listos para una celebración por todo lo alto, vestidos de gala y brillando con luz propia. Verte radiante, feliz y celebrando la vida es una de las mejores postales de nuestra historia.',
    image: '/assets/aistudio/jess3_e90783af.jpg',
    x: 75,
    y: 20,
    category: 'Eventos',
    notes: 'Noches inolvidables donde todo fue diversión.'
  },
  {
    id: 'mem-16',
    title: 'Celebración y Buena Vida',
    date: 'Constelación Real · Órbita 16',
    description: 'Música, luces, buena vibra y la felicidad de rodearte de personas que suman luz a tu vida. Un brindis por cada instante compartido y por todos los que vendrán.',
    image: '/assets/aistudio/jess12_85a1a381.jpg',
    x: 62,
    y: 15,
    category: 'Eventos',
    notes: 'Bailando y festejando los mejores momentos.'
  },
  {
    id: 'mem-17',
    title: '¡Graduados! Meta Cumplida',
    date: 'Cúmulo Éxito · Órbita 17',
    description: 'Toga, birrete y la emoción de haber superado cada desafío con dedicación, talento y tenacidad. Qué honor haber compartido ese logro histórico a tu lado. ¡Siempre orgulloso de ti!',
    image: '/assets/aistudio/jess8_aca7e7fe.jpg',
    x: 58,
    y: 34,
    category: 'Logros',
    notes: 'La prueba de que los sueños se construyen y se conquistan.'
  },
  {
    id: 'mem-18',
    title: '¡Feliz Cumpleaños, Jess!',
    date: 'Núcleo Central · Estrella Radiante',
    description: 'El legendario pastel de Barbie y la sonrisa más hermosa para celebrar tu vida. Que este nuevo año en tu vida esté lleno de bendiciones inmensas, salud inquebrantable, éxito en cada proyecto y personas que te amen tanto como te lo mereces. ¡Gracias por existir y ser tan única!',
    image: '/assets/aistudio/jess23_f4b16d3a.jpg',
    x: 50,
    y: 50,
    category: 'Cumpleaños',
    isCore: true,
    notes: 'La estrella más brillante de toda la galaxia. ¡Feliz día!'
  }
];

export const INITIAL_DEDICATION_LETTER = {
  recipient: 'Jess',
  title: 'Para alguien verdaderamente especial',
  subtitle: 'Un tributo estelar a través del tiempo y las memorias',
  content: `Querida Jess,

Dicen que entre los millones de galaxias y miles de millones de estrellas en el firmamento, coincidir en el mismo tiempo y en el mismo lugar con un alma tan hermosa como la tuya es uno de los mayores milagros que existen.

A lo largo de los días, entre llamadas que desafiaban la madrugada, risas que no tenían explicación, momentos de esfuerzo hasta vernos graduados con la toga puesta, y salidas que quedarán grabadas en mi memoria por siempre, has sido una presencia luminosa y sincera.

Tu energía, tu nobleza, tus ocurrencias y tu capacidad de hacer que cualquier día ordinario se vuelva un recuerdo dorado son un regalo inmenso para quienes tenemos la suerte de conocerte y caminar a tu lado.

Por eso construí este universo para ti: cada estrella flotante es una memoria viva, un testimonio de nuestro camino y un recordatorio de que siempre serás alguien sumamente importante en mi vida.

Que el cosmos te colme de paz, éxitos imparables, salud y felicidad absoluta. Gracias por cada sonrisa compartida.

Con todo mi cariño y admiración,
Siempre contigo.`
};
