import type { Lang } from '@/lib/translations';

/**
 * DRAFT privacy notice (/privacy), awaiting a lawyer's review. Square brackets mark what still has to be confirmed;
 * nothing here states a provider region, retention period or legal basis that has not been confirmed. Written by
 * Claude in all three languages (TR and AR included), for review.
 * A block is a paragraph (string) or a bullet list (string[]).
 */
export interface PrivacyContent {
  draft: string;
  title: string;
  status: string;
  sections: { heading: string; blocks: (string | string[])[] }[];
}

export const PRIVACY: Record<Lang, PrivacyContent> = {
  EN: {
    draft: 'DRAFT: awaiting review by a lawyer, not in force. Text in [square brackets] is a placeholder to confirm before publishing.',
    title: 'Privacy notice',
    status: 'Draft prepared in October 2026. Not yet in force.',
    sections: [
      {
        heading: 'Who is responsible',
        blocks: [
          'The data controller is Ahmed Alnaseri, who runs AMD NSRI [TO CONFIRM: legal status, for example private individual or sole proprietorship, and postal address]. For any privacy question or request, write to contact@amdnsri.com.',
          'This notice covers the newsletter sign-up, the contact form and the basic operation of this website. It is meant to meet the duty to inform under Turkey\'s Personal Data Protection Law No. 6698 (KVKK) and, where it applies, the EU General Data Protection Regulation (GDPR).',
        ],
      },
      {
        heading: 'Newsletter',
        blocks: [
          'If you subscribe, we store:',
          [
            'your email address, and your name if you give it;',
            'the status of your subscription: waiting for confirmation, confirmed or unsubscribed;',
            'when you agreed, the version of the exact wording you agreed to, and the language it was shown in;',
            'the page you subscribed from;',
            'when you confirmed and, if it happens, when you unsubscribed;',
            'whether your consent has been registered with Turkey\'s commercial electronic message system (İYS).',
          ],
          'We do not store your IP address or details of your browser or device. To stop abuse, sign-up attempts are counted per network address and per email address for a short time; these counters hold only a one-way scrambled code, not the address itself, and are deleted within two days.',
          'Purpose: to send you the emails you asked for, about new projects, journal articles and updates to the digital tools. You first receive one confirmation email; nothing else is sent unless you confirm.',
          'Legal basis: your explicit consent (KVKK Article 5(1); GDPR Article 6(1)(a)) and your approval for commercial electronic messages under Law No. 6563 [LAWYER TO CONFIRM].',
        ],
      },
      {
        heading: 'Unsubscribing and withdrawing consent',
        blocks: [
          'Every newsletter email contains an unsubscribe link that works in one click, without logging in. You can also write to contact@amdnsri.com. Withdrawing consent does not affect emails sent before.',
          'After you unsubscribe we keep a minimal record (your address marked as unsubscribed, and a one-way code of it) only so that you are not added again by mistake. You can ask for this record to be deleted as well.',
        ],
      },
      {
        heading: 'How long we keep data',
        blocks: [[
          'Sign-ups that are not confirmed: deleted automatically 7 days after the request.',
          'Confirmed subscriptions: until you unsubscribe or ask for deletion.',
          'Unsubscribed addresses: the minimal record described above, until you ask for deletion.',
          'Contact form messages: [TO CONFIRM: how long messages are kept in the inbox].',
        ]],
      },
      {
        heading: 'Contact form',
        blocks: [
          'When you use the contact form, your name, email address, subject and message are sent to us by email so that we can reply. The website does not store them in a database.',
          'Legal basis: [LAWYER TO CONFIRM: for example steps before a contract or legitimate interest, KVKK Article 5(2)(c) or (f); GDPR Article 6(1)(b) or (f)].',
        ],
      },
      {
        heading: 'Service providers and transfers abroad',
        blocks: [
          'The website relies on these providers [TO CONFIRM before publishing: providers, regions and contract terms]:',
          [
            'Vercel: hosting of the website, including the sign-up form [TO CONFIRM: region].',
            'Neon: the newsletter database [TO CONFIRM: region; planned Frankfurt, Germany].',
            'Resend: delivery of the confirmation email and of contact form messages. Resend states that it stores account data, including email logs, in the United States.',
          ],
          'Your data is therefore transferred outside Turkey [TO CONFIRM: countries]. [LAWYER TO CONFIRM: the basis for these transfers under KVKK Article 9 and, where relevant, Chapter V of the GDPR.]',
        ],
      },
      {
        heading: 'Analytics, cookies and your browser',
        blocks: [
          'The website counts page views with Vercel Web Analytics, which works without cookies [TO CONFIRM]. The website does not set cookies. Your language choice, and on the tool pages your work in progress, are saved in your own browser and are not sent to us.',
        ],
      },
      {
        heading: 'Your rights',
        blocks: [
          'Under Article 11 of the KVKK you can ask whether your data is processed and for information about it; learn the purpose and whether it is used accordingly; learn who it is shared with in Turkey or abroad; have it corrected, deleted or destroyed and have those it was shared with informed; object to a result against you produced solely by automated processing; and claim compensation for damage caused by unlawful processing.',
          'Where the GDPR applies you also have the rights of access, rectification, erasure, restriction, data portability and objection, and you can withdraw consent at any time.',
          'Write to contact@amdnsri.com. Requests are answered within 30 days [LAWYER TO CONFIRM]. You can also complain to the Personal Data Protection Board (Kişisel Verileri Koruma Kurulu) in Turkey or to a data protection authority in the EU.',
        ],
      },
      {
        heading: 'Commercial electronic messages (İYS)',
        blocks: [
          '[LAWYER TO CONFIRM: whether registration with İYS applies, and how consents are registered there.] Registration with İYS is tracked separately from your email confirmation and is never marked as done automatically.',
        ],
      },
      {
        heading: 'Changes to this notice',
        blocks: [
          'If this notice changes, the new version is published on this page with its date. If the purpose of the newsletter changes, your consent will be asked for again.',
        ],
      },
    ],
  },

  TR: {
    draft: 'TASLAK: hukuki incelemeyi bekliyor, yürürlükte değil. [Köşeli parantez] içindeki ifadeler yayından önce teyit edilecek yer tutuculardır.',
    title: 'Gizlilik ve aydınlatma metni',
    status: 'Ekim 2026\'da hazırlanan taslak. Henüz yürürlükte değil.',
    sections: [
      {
        heading: 'Veri sorumlusu',
        blocks: [
          'Veri sorumlusu, AMD NSRI\'ı yürüten Ahmed Alnaseri\'dir [TEYİT EDİLECEK: hukuki statü, örneğin gerçek kişi veya şahıs şirketi, ve posta adresi]. Gizlilikle ilgili her soru ve talep için contact@amdnsri.com adresine yazabilirsiniz.',
          'Bu metin bülten aboneliğini, iletişim formunu ve web sitesinin temel işleyişini kapsar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki aydınlatma yükümlülüğünü ve uygulandığı ölçüde AB Genel Veri Koruma Tüzüğü\'nü (GDPR) karşılamak amacıyla hazırlanmıştır.',
        ],
      },
      {
        heading: 'Bülten',
        blocks: [
          'Abone olursanız şunları saklarız:',
          [
            'e-posta adresiniz ve verirseniz adınız;',
            'aboneliğinizin durumu: onay bekliyor, onaylandı veya abonelikten çıkıldı;',
            'onay verdiğiniz zaman, kabul ettiğiniz metnin sürümü ve metnin gösterildiği dil;',
            'abone olduğunuz sayfa;',
            'onayladığınız zaman ve gerçekleşirse abonelikten çıktığınız zaman;',
            'onayınızın Ticari Elektronik İleti Yönetim Sistemi\'ne (İYS) kaydedilip kaydedilmediği.',
          ],
          'IP adresinizi veya tarayıcınıza ve cihazınıza ilişkin bilgileri saklamayız. Kötüye kullanımı önlemek için kayıt denemeleri kısa bir süre boyunca ağ adresi ve e-posta adresi başına sayılır; bu sayaçlar adresin kendisini değil, yalnızca tek yönlü şifrelenmiş bir kodu tutar ve iki gün içinde silinir.',
          'Amaç: talep ettiğiniz, yeni projeler, günlük yazıları ve dijital araçlardaki güncellemeler hakkındaki e-postaları size göndermek. Önce tek bir onay e-postası alırsınız; onaylamadığınız sürece başka bir şey gönderilmez.',
          'Hukuki sebep: açık rızanız (KVKK m. 5/1; GDPR m. 6/1-a) ve 6563 sayılı Kanun kapsamında ticari elektronik iletiler için verdiğiniz onay [AVUKAT TEYİT EDECEK].',
        ],
      },
      {
        heading: 'Abonelikten çıkma ve rızanın geri alınması',
        blocks: [
          'Her bülten e-postasında, oturum açmadan tek tıkla çalışan bir abonelikten çıkma bağlantısı bulunur. contact@amdnsri.com adresine de yazabilirsiniz. Rızanın geri alınması, daha önce gönderilmiş e-postaları etkilemez.',
          'Abonelikten çıktıktan sonra, yalnızca yanlışlıkla yeniden eklenmemeniz için asgari bir kayıt (abonelikten çıktı olarak işaretlenen adresiniz ve adresin tek yönlü kodu) tutarız. Bu kaydın da silinmesini talep edebilirsiniz.',
        ],
      },
      {
        heading: 'Saklama süreleri',
        blocks: [[
          'Onaylanmayan kayıtlar: talepten 7 gün sonra otomatik olarak silinir.',
          'Onaylanmış abonelikler: abonelikten çıkana veya silinmesini talep edene kadar.',
          'Abonelikten çıkılan adresler: yukarıda açıklanan asgari kayıt, silinmesini talep edene kadar.',
          'İletişim formu mesajları: [TEYİT EDİLECEK: mesajların gelen kutusunda ne kadar süre saklandığı].',
        ]],
      },
      {
        heading: 'İletişim formu',
        blocks: [
          'İletişim formunu kullandığınızda adınız, e-posta adresiniz, konu ve mesajınız size yanıt verebilmemiz için bize e-posta ile iletilir. Web sitesi bunları bir veri tabanında saklamaz.',
          'Hukuki sebep: [AVUKAT TEYİT EDECEK: örneğin sözleşmenin kurulmasıyla doğrudan ilgili olması veya meşru menfaat, KVKK m. 5/2-c veya f; GDPR m. 6/1-b veya f].',
        ],
      },
      {
        heading: 'Hizmet sağlayıcılar ve yurt dışına aktarım',
        blocks: [
          'Web sitesi şu hizmet sağlayıcılardan yararlanır [YAYINDAN ÖNCE TEYİT EDİLECEK: sağlayıcılar, bölgeler ve sözleşme koşulları]:',
          [
            'Vercel: abonelik formu dahil web sitesinin barındırılması [TEYİT EDİLECEK: bölge].',
            'Neon: bülten veri tabanı [TEYİT EDİLECEK: bölge; planlanan Frankfurt, Almanya].',
            'Resend: onay e-postasının ve iletişim formu mesajlarının iletilmesi. Resend, e-posta kayıtları dahil hesap verilerini Amerika Birleşik Devletleri\'nde sakladığını belirtmektedir.',
          ],
          'Bu nedenle verileriniz Türkiye dışına aktarılır [TEYİT EDİLECEK: ülkeler]. [AVUKAT TEYİT EDECEK: bu aktarımların KVKK m. 9 ve ilgili olduğu ölçüde GDPR V. Bölüm kapsamındaki dayanağı.]',
        ],
      },
      {
        heading: 'Analitik, çerezler ve tarayıcınız',
        blocks: [
          'Web sitesi sayfa görüntülemelerini çerez kullanmadan çalışan Vercel Web Analytics ile sayar [TEYİT EDİLECEK]. Web sitesi çerez yerleştirmez. Dil tercihiniz ve araç sayfalarında devam eden çalışmanız kendi tarayıcınızda saklanır ve bize gönderilmez.',
        ],
      },
      {
        heading: 'Haklarınız',
        blocks: [
          'KVKK\'nın 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme; işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme; yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme; eksik veya yanlış işlenmişse düzeltilmesini, silinmesini veya yok edilmesini ve bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme; münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.',
          'GDPR\'ın uygulandığı durumlarda ayrıca erişim, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve itiraz haklarına sahipsiniz ve rızanızı her zaman geri alabilirsiniz.',
          'Taleplerinizi contact@amdnsri.com adresine iletebilirsiniz. Talepler en geç 30 gün içinde yanıtlanır [AVUKAT TEYİT EDECEK]. Türkiye\'de Kişisel Verileri Koruma Kurulu\'na veya AB\'de bir veri koruma otoritesine de şikâyette bulunabilirsiniz.',
        ],
      },
      {
        heading: 'Ticari elektronik iletiler (İYS)',
        blocks: [
          '[AVUKAT TEYİT EDECEK: İYS kaydının uygulanıp uygulanmadığı ve onayların İYS\'ye nasıl kaydedileceği.] İYS kaydı, e-posta onayınızdan ayrı olarak takip edilir ve hiçbir zaman otomatik olarak tamamlandı olarak işaretlenmez.',
        ],
      },
      {
        heading: 'Bu metindeki değişiklikler',
        blocks: [
          'Bu metin değişirse yeni sürümü tarihiyle birlikte bu sayfada yayımlanır. Bültenin amacı değişirse rızanız yeniden istenir.',
        ],
      },
    ],
  },

  AR: {
    draft: 'مسودة: بانتظار مراجعة محامٍ، وغير سارية. ما بين [معقوفين] نصوص مؤقتة يجب التحقق منها قبل النشر.',
    title: 'إشعار الخصوصية',
    status: 'مسودة أُعدّت في أكتوبر 2026. غير سارية بعد.',
    sections: [
      {
        heading: 'الجهة المسؤولة',
        blocks: [
          'المسؤول عن البيانات هو أحمد الناصري، الذي يدير AMD NSRI [يُستكمَل: الصفة القانونية، كأن يكون فرداً أو مؤسسة فردية، والعنوان البريدي]. لأي سؤال أو طلب يتعلق بالخصوصية، راسلنا على contact@amdnsri.com.',
          'يغطي هذا الإشعار الاشتراك في النشرة البريدية ونموذج التواصل والتشغيل الأساسي لهذا الموقع. وقد أُعدّ للوفاء بواجب الإعلام بموجب قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK)، وبموجب اللائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR) حيثما تنطبق.',
        ],
      },
      {
        heading: 'النشرة البريدية',
        blocks: [
          'إذا اشتركت، فإننا نحفظ ما يلي:',
          [
            'عنوان بريدك الإلكتروني، واسمك إن أدخلته؛',
            'حالة اشتراكك: بانتظار التأكيد، أو مؤكَّد، أو ملغى؛',
            'وقت موافقتك، وإصدار النص الذي وافقت عليه، واللغة التي عُرض بها؛',
            'الصفحة التي اشتركت منها؛',
            'وقت تأكيدك، ووقت إلغاء اشتراكك إن حدث ذلك؛',
            'ما إذا كانت موافقتك قد سُجّلت في نظام إدارة الرسائل التجارية الإلكترونية في تركيا (İYS).',
          ],
          'لا نحفظ عنوان IP الخاص بك ولا بيانات متصفحك أو جهازك. ولمنع إساءة الاستخدام، تُحصى محاولات الاشتراك لفترة قصيرة لكل عنوان شبكة ولكل عنوان بريد إلكتروني؛ ولا تحتفظ هذه العدّادات إلا برمز مُشفَّر باتجاه واحد لا بالعنوان نفسه، وتُحذف خلال يومين.',
          'الغرض: إرسال الرسائل التي طلبتها حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية. تصلك أولاً رسالة تأكيد واحدة، ولا يُرسَل إليك شيء آخر ما لم تؤكّد.',
          'الأساس القانوني: موافقتك الصريحة (المادة 5/1 من KVKK؛ المادة 6/1/أ من GDPR) وموافقتك على الرسائل التجارية الإلكترونية بموجب القانون رقم 6563 [يؤكّده المحامي].',
        ],
      },
      {
        heading: 'إلغاء الاشتراك وسحب الموافقة',
        blocks: [
          'تحتوي كل رسالة من النشرة على رابط لإلغاء الاشتراك يعمل بنقرة واحدة ودون تسجيل دخول. ويمكنك أيضاً مراسلتنا على contact@amdnsri.com. ولا يؤثر سحب الموافقة في الرسائل المرسَلة قبله.',
          'بعد إلغاء اشتراكك نحتفظ بسجلّ أدنى (عنوانك موسوماً بأنه ملغى، ورمز مشفَّر باتجاه واحد له) لغرض وحيد هو ألّا يُضاف عنوانك مجدداً عن طريق الخطأ. ويمكنك طلب حذف هذا السجل أيضاً.',
        ],
      },
      {
        heading: 'مدة الاحتفاظ بالبيانات',
        blocks: [[
          'طلبات الاشتراك غير المؤكَّدة: تُحذف تلقائياً بعد 7 أيام من الطلب.',
          'الاشتراكات المؤكَّدة: إلى أن تلغي اشتراكك أو تطلب الحذف.',
          'العناوين الملغى اشتراكها: السجلّ الأدنى الموصوف أعلاه، إلى أن تطلب حذفه.',
          'رسائل نموذج التواصل: [يُستكمَل: مدة الاحتفاظ بالرسائل في صندوق البريد].',
        ]],
      },
      {
        heading: 'نموذج التواصل',
        blocks: [
          'عند استخدامك نموذج التواصل، يُرسَل إلينا اسمك وبريدك الإلكتروني والموضوع ورسالتك عبر البريد الإلكتروني لنتمكن من الرد عليك. ولا يحفظها الموقع في قاعدة بيانات.',
          'الأساس القانوني: [يؤكّده المحامي: مثلاً اتخاذ خطوات تسبق إبرام عقد أو المصلحة المشروعة، المادة 5/2/ج أو و من KVKK؛ المادة 6/1/ب أو و من GDPR].',
        ],
      },
      {
        heading: 'مزوّدو الخدمات والنقل إلى الخارج',
        blocks: [
          'يعتمد الموقع على مزوّدي الخدمات التالين [يُتحقَّق منه قبل النشر: المزوّدون والمناطق وشروط التعاقد]:',
          [
            'Vercel: استضافة الموقع، بما في ذلك نموذج الاشتراك [يُستكمَل: المنطقة].',
            'Neon: قاعدة بيانات النشرة البريدية [يُستكمَل: المنطقة؛ المخطَّط لها فرانكفورت، ألمانيا].',
            'Resend: إيصال رسالة التأكيد ورسائل نموذج التواصل. وتذكر Resend أنها تحفظ بيانات الحساب، بما فيها سجلات البريد، في الولايات المتحدة.',
          ],
          'لذلك تُنقَل بياناتك إلى خارج تركيا [يُستكمَل: الدول]. [يؤكّده المحامي: الأساس القانوني لهذا النقل بموجب المادة 9 من KVKK، وبموجب الفصل الخامس من GDPR حيثما ينطبق.]',
        ],
      },
      {
        heading: 'التحليلات وملفات تعريف الارتباط ومتصفحك',
        blocks: [
          'يُحصي الموقع مشاهدات الصفحات باستخدام Vercel Web Analytics الذي يعمل دون ملفات تعريف الارتباط [يُتحقَّق منه]. ولا يضع الموقع ملفات تعريف ارتباط. وتُحفَظ لغتك المختارة، وعملك الجاري في صفحات الأدوات، في متصفحك أنت ولا تُرسَل إلينا.',
        ],
      },
      {
        heading: 'حقوقك',
        blocks: [
          'بموجب المادة 11 من KVKK يحق لك أن تعرف ما إذا كانت بياناتك تُعالَج وأن تطلب معلومات عنها؛ وأن تعرف غرض المعالجة وما إذا كانت تُستخدم وفقاً له؛ وأن تعرف الجهات التي نُقلت إليها داخل تركيا أو خارجها؛ وأن تطلب تصحيحها أو حذفها أو إتلافها وإبلاغ تلك الجهات بذلك؛ وأن تعترض على أي نتيجة ضدك ناتجة حصراً عن معالجة آلية؛ وأن تطالب بالتعويض عن الضرر الناجم عن معالجة غير مشروعة.',
          'وحيثما تنطبق GDPR، يحق لك أيضاً الوصول إلى بياناتك وتصحيحها ومحوها وتقييد معالجتها ونقلها والاعتراض على معالجتها، ولك أن تسحب موافقتك في أي وقت.',
          'راسلنا على contact@amdnsri.com، ويُردّ على الطلبات خلال 30 يوماً [يؤكّده المحامي]. ويمكنك أيضاً تقديم شكوى إلى مجلس حماية البيانات الشخصية (Kişisel Verileri Koruma Kurulu) في تركيا، أو إلى سلطة لحماية البيانات في الاتحاد الأوروبي.',
        ],
      },
      {
        heading: 'الرسائل التجارية الإلكترونية (İYS)',
        blocks: [
          '[يؤكّده المحامي: ما إذا كان التسجيل في İYS لازماً، وكيفية تسجيل الموافقات فيه.] يُتابَع التسجيل في İYS بمعزل عن تأكيد بريدك الإلكتروني، ولا يُعلَّم مطلقاً على أنه مُنجَز تلقائياً.',
        ],
      },
      {
        heading: 'التغييرات على هذا الإشعار',
        blocks: [
          'إذا تغيّر هذا الإشعار، تُنشر النسخة الجديدة في هذه الصفحة مع تاريخها. وإذا تغيّر غرض النشرة البريدية، فستُطلب موافقتك من جديد.',
        ],
      },
    ],
  },
};
