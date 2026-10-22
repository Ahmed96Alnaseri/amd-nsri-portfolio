import type { Lang } from '@/lib/translations';
import type { LegalDoc } from '@/lib/privacy-content';

/**
 * Privacy Notice and Explicit Consent Statement for the email gate on the free tools, shown on /privacy and
 * /consent while TOOL_GATE_MODE is on (src/app/privacy, src/app/consent).
 *
 * Both are copies of the newsletter texts (src/lib/privacy-content.ts, src/lib/consent-content.ts, written on the
 * lawyer's structure), changed only where the gate works differently: one email form before the tools, one welcome
 * email, nothing stored on the hosting server, the sign-up sent as one email to a mailbox in Turkey, removal by
 * writing to contact@amdnsri.com. The lawyer approved this approach (2026-10-20); the review markers and the draft
 * banner were removed afterwards. Turkish is the source text; EN and AR are Claude's translations.
 * [[text|/path]] is a link.
 */

export const GATE_PRIVACY: Record<Lang, LegalDoc> = {
  TR: {
    title: 'AMD NSRI Aydınlatma Metni',
    status: `Bu sürüm, ücretsiz araçlardan önce istenen e-posta girişini kapsar. Esas metin Türkçe metindir; İngilizce ve Arapça metinler çeviridir.`,
    intro: [
      `AMD NSRI olarak kişisel verilerinizin güvenliğinin sağlanmasına önem veriyoruz. Bu amaçla, kişisel verilerin korunması için gerekli önlemleri alan ve azami hassasiyet gösteren AMD NSRI olarak, web sitemizdeki ücretsiz araçları kullanmadan önce istenen e-posta girişi ve bülten kapsamında kişisel verilerinizin işlenmesi hususunda sizleri 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("Kanun") 10. maddesi uyarınca bilgilendirmek isteriz.`,
    ],
    sections: [
      {
        heading: '1. Veri Sorumlusu',
        blocks: [
          'Kişisel verileriniz, Kanun\'un 3. maddesinde tanımlı "Veri Sorumlusu" sıfatıyla Ahmed Alnaseri tarafından işlenmektedir.',
          'Ahmed Alnaseri — E-posta adresi: contact@amdnsri.com.',
        ],
      },
      {
        heading: '2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri',
        blocks: [
          `Web sitemizdeki araç sayfalarında, araçları kullanmadan önce gösterilen e-posta formu aracılığıyla sizlerden toplanan iletişim (e-posta adresiniz), pazarlama (bülten onay tercihiniz) ve işlem güvenliği (onay zamanı, onay metinlerinin sürümü ve gösterildiği dil, formun doldurulduğu araç sayfası) kategorilerindeki kişisel verileriniz aşağıda belirtilen amaç ve hukuki sebeplerle işlenmektedir.`,
          'Açık rızanızın bulunması (Kanun m. 5/1) sebebine dayanılarak; iletişim ve pazarlama kategorilerindeki verileriniz aşağıdaki amaçla işlenir:',
          [
            `İletişim Faaliyetlerinin Yürütülmesi (kayıttan sonra bir hoş geldiniz e-postası ile yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderilmesi) ve ücretsiz araçlara erişimin sağlanması`,
          ],
          'Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (Kanun m. 5/2-ç) sebebine dayanılarak; iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz aşağıdaki amaçlarla işlenir:',
          [
            `Faaliyetlerin Mevzuata Uygun Yürütülmesi (ticari elektronik ileti onayının ve silme taleplerinin ispatı ve uygulanması hâlinde İleti Yönetim Sistemi'ne (İYS) kayıt)`,
            'Saklama ve Arşiv Faaliyetlerinin Yürütülmesi',
            'Talep / Şikayetlerin Takibi (Kanun\'un 11. maddesi kapsamındaki başvuruların yanıtlanması)',
            'Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi',
          ],
          'İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (Kanun m. 5/2-f) sebebine dayanılarak; iletişim ve işlem güvenliği kategorilerindeki verileriniz aşağıdaki amaçlarla işlenir:',
          [
            'Bilgi Güvenliği Süreçlerinin Yürütülmesi (otomatik ve kötüye kullanım amaçlı kayıtların engellenmesi)',
            'Veri Sorumlusu Operasyonlarının Güvenliğinin Temini',
          ],
          `IP adresiniz ile tarayıcınıza ve cihazınıza ilişkin bilgiler saklanmaz. Kötüye kullanımı önlemek için kayıt denemeleri kısa bir süre boyunca ağ adresi ve e-posta adresi başına sayılır; bu sayaçlar adresin kendisini değil, yalnızca tek yönlü bir kodu tutar, yalnızca sunucu işleminin çalışma belleğinde bulunur, hiçbir yere yazılmaz ve bu işlem sona erdiğinde kaybolur.`,
          'Web sitesindeki iletişim formu aracılığıyla gönderilen mesajlar (ad, e-posta adresi, konu ve mesaj) Resend e-posta hizmeti aracılığıyla e-posta olarak posta kutumuza iletilir; web sitesi bu mesajları saklamaz.',
        ],
      },
      {
        heading: '3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği',
        blocks: [
          'İşlediğimiz kişisel verilerinizi, yalnızca yukarıdaki amaçlarla ve bu amaçlar için gerekli olduğu ölçüde aşağıdaki taraflara aktarabilmekteyiz:',
          `Hizmet aldığımız Özel Hukuk Tüzel Kişilerine; iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz, web sitesinin, e-posta formunun ve bültenin teknik olarak çalıştırılması (Bilgi Güvenliği Süreçlerinin Yürütülmesi, İletişim Faaliyetlerinin Yürütülmesi, Saklama ve Arşiv Faaliyetlerinin Yürütülmesi) amacıyla aktarılır:`,
          [
            `Vercel (Amerika Birleşik Devletleri): web sitesinin ve e-posta formunun barındırılması; formu işleyen sunucu Frankfurt, Almanya'da çalışır; e-posta adresiniz bu sunucudan yalnızca geçer ve orada saklanmaz.`,
            `E-posta hizmeti sağlayıcısı turhost (Çizgi Telekomünikasyon A.Ş.) (Türkiye): her kayıt, adresiniz ve onaylarınızla birlikte tek bir e-posta olarak signups@news.amdnsri.com posta kutusuna iletilir ve orada saklanır; adresinize gönderilen hoş geldiniz e-postası da bu sağlayıcı üzerinden gönderilir.`,
            `Google (Google Fonts): web sitesinin ve IPunch, NESTRI ve NESTRI PRO araç sayfalarının yazı tiplerinin yüklenmesi; bu sayfalardan biri açıldığında IP adresiniz Google'a iletilir.`,
            `jsDelivr: IPunch'ta ilk kez bir DWG dosyası açıldığında DWG okuyucu kod kitaplığının yüklenmesi; bu sırada IP adresiniz jsDelivr'e iletilir, dosyanız ise cihazınızdan çıkmaz.`,
          ],
          `Vercel, Google, jsDelivr ve Resend Türkiye dışında bulunduğundan kişisel verileriniz yurt dışına aktarılmaktadır.`,
          'Yetkili Kamu Kurum ve Kuruluşlarına; iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz, yalnızca mevzuatın gerektirdiği hâllerde aşağıdaki amaçlarla aktarılır:',
          [
            'Faaliyetlerin Mevzuata Uygun Yürütülmesi',
            'Hukuk İşlerinin Takibi ve Yürütülmesi',
            'Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi',
          ],
          'Kişisel verileriniz, üçüncü kişilere kendi reklam veya pazarlama amaçları için aktarılmaz. Yukarıda sayılan aktarımlar, Kanun\'da belirtilen kişisel veri işleme şartları çerçevesinde gerçekleştirilmektedir.',
        ],
      },
      {
        heading: '4. Kişisel Verileri Toplama Yöntemlerimiz',
        blocks: [
          'Otomatik ya da kısmen otomatik yöntemlerle:',
          [
            `İletişim ve pazarlama kategorilerindeki kişisel verileriniz, araç sayfalarındaki e-posta formunu doldurduğunuzda doğrudan sizden toplanmaktadır.`,
            `İşlem güvenliği kategorisindeki kişisel verileriniz, formu gönderdiğinizde kayıt e-postasına eklenmektedir. Ardından adresinize bir hoş geldiniz e-postası gönderilir; bu e-posta sizden herhangi bir onay istemez.`,
          ],
          'Kişisel verileriniz üçüncü kişilerden toplanmamaktadır. Topladığımız kişisel verileriniz yasal yollardan elde edilmektedir.',
        ],
      },
      {
        heading: '5. İlgili Kişi Olarak Haklarınız',
        blocks: [
          'Kanun\'un "ilgili kişinin hakları"nı düzenleyen 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme, Kanun\'un 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme, bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.',
          'Bu haklarınıza ve Kanun\'un uygulamasına ilişkin taleplerinizi, sistemimizde kayıtlı bulunan e-posta adresinizi ya da kayıtlı elektronik posta (KEP) adresinizi kullanarak contact@amdnsri.com adresine e-posta ile iletebilirsiniz. Talebinizi niteliğine göre en kısa sürede ve en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandıracağız.',
        ],
      },
      {
        heading: '6. Kişisel Verilerin Saklanma Süresi',
        blocks: [[
          `Kaydınıza ilişkin hiçbir bilgi barındırma sağlayıcısının sunucularında saklanmaz.`,
          `Kaydınız, Türkiye'deki posta kutumuzda tek bir e-posta olarak, contact@amdnsri.com adresine yazarak silinmesini isteyene kadar saklanır.`,
          `Silme talebinizde kaydınız silinir.`,
          `Kötüye kullanımı önlemeye yönelik sayaçlar yalnızca sunucu işleminin çalışma belleğinde tutulur ve bu işlem sona erdiğinde kaybolur.`,
        ]],
      },
      {
        heading: '7. Tarayıcınızda Saklanan Bilgiler',
        blocks: [
          `Web sitemiz ve araç sayfalarımız çerez kullanmaz. Tarayıcınızın yerel depolama alanında yalnızca şunlar tutulur: web sitesinde seçtiğiniz dil ve değiştirdiyseniz açık/koyu tema tercihi; NESTRI, NESTRI PRO ve IPunch araç sayfalarında seçtiğiniz dil; NESTRI ve NESTRI PRO'da kaydedilen, üzerinde çalıştığınız proje; Expanded Mesh Generator'da açık bıraktığınız bölümler; ve araç sayfalarındaki e-posta formunu gönderdikten sonra, bu cihazın kayıt olduğunu gösteren bir işaret ile tarihi (e-posta adresiniz değil). Bu bilgiler yalnızca kendi cihazınızda kalır, bize gönderilmez ve tarayıcı ayarlarınızdan silinebilir.`,
          'Sayfa görüntülemeleri Vercel Web Analytics ile çerez kullanılmadan sayılır. Yazı tipleri Google Fonts\'tan yüklenir (bkz. 3. bölüm).',
        ],
      },
    ],
  },

  EN: {
    title: 'AMD NSRI Privacy Notice',
    status: `This version covers the email sign-up asked for before the free tools. The Turkish text is the authoritative version; the English and Arabic texts are translations.`,
    intro: [
      `At AMD NSRI we care about keeping your personal data secure. As AMD NSRI, taking the necessary measures and the utmost care to protect personal data, we would like to inform you, under Article 10 of Personal Data Protection Law No. 6698 (the "Law"), about how your personal data is processed in connection with the email sign-up asked for before using the free tools on our website, and the newsletter.`,
    ],
    sections: [
      {
        heading: '1. Data Controller',
        blocks: [
          'Your personal data is processed by Ahmed Alnaseri in the capacity of "Data Controller" as defined in Article 3 of the Law.',
          'Ahmed Alnaseri — Email: contact@amdnsri.com.',
        ],
      },
      {
        heading: '2. Purposes and Legal Grounds for Processing',
        blocks: [
          `Your personal data in the categories of contact (your email address), marketing (your newsletter consent preference) and transaction security (time of consent, version and language of the consent texts, and the tool page where you filled in the form), collected from you through the email form shown on the tool pages of our website before you use the tools, is processed for the purposes and on the legal grounds set out below.`,
          'On the ground of your explicit consent (Law, Art. 5/1), your data in the contact and marketing categories is processed for the following purpose:',
          [
            `Carrying out communication activities (sending one welcome email after sign-up, and the newsletter about new projects, journal articles and digital tool updates) and giving access to the free tools`,
          ],
          'On the ground that processing is necessary for the data controller to comply with a legal obligation (Law, Art. 5/2-ç), your data in the contact, marketing and transaction security categories is processed for the following purposes:',
          [
            `Carrying out activities in compliance with the legislation (proof of consent to commercial electronic messages and of removal requests, and, where applicable, registration with the Message Management System (İYS))`,
            'Carrying out storage and archiving activities',
            'Following up requests and complaints (answering applications under Article 11 of the Law)',
            'Providing information to authorised persons, institutions and organisations',
          ],
          'On the ground that processing is necessary for the legitimate interests of the data controller, provided that it does not harm your fundamental rights and freedoms (Law, Art. 5/2-f), your data in the contact and transaction security categories is processed for the following purposes:',
          [
            'Carrying out information security processes (preventing automated and abusive sign-ups)',
            'Ensuring the security of the data controller\'s operations',
          ],
          `Your IP address and details of your browser or device are not stored. To prevent abuse, sign-up attempts are counted for a short time per network address and per email address; these counters hold only a one-way code, not the address itself, exist only in the working memory of the server process, are never written anywhere, and are gone when that process ends.`,
          'Messages sent through the contact form on the website (name, email address, subject and message) are delivered by email to our mailbox through the email service Resend; the website does not store them.',
        ],
      },
      {
        heading: '3. To Whom and for What Purpose Personal Data May Be Transferred',
        blocks: [
          'We may transfer your personal data to the parties below, only for the purposes above and only as far as these purposes require:',
          `To private-law legal entities that provide services to us, your data in the contact, marketing and transaction security categories is transferred for running the website, the email form and the newsletter technically (carrying out information security processes, communication activities, and storage and archiving activities):`,
          [
            `Vercel (United States): hosting of the website and the email form; the server that handles the form runs in Frankfurt, Germany; your email address only passes through it and is not stored there.`,
            `Email service provider turhost (Çizgi Telekomünikasyon A.Ş.) (Turkey): each sign-up is sent, with your address and your approvals, as one email to the signups@news.amdnsri.com mailbox, where it is kept; the welcome email to your address is also sent through this provider.`,
            `Google (Google Fonts): loading the typefaces of the website and of the IPunch, NESTRI and NESTRI PRO tool pages; when one of these pages opens, your IP address is sent to Google.`,
            `jsDelivr: loading the DWG-reading code library the first time a DWG file is opened in IPunch; your IP address is sent to jsDelivr, while your file does not leave your device.`,
          ],
          `Since Vercel, Google, jsDelivr and Resend are located outside Turkey, your personal data is transferred abroad.`,
          'To authorised public institutions and organisations, your data in the contact, marketing and transaction security categories is transferred only where the legislation requires it, for the following purposes:',
          [
            'Carrying out activities in compliance with the legislation',
            'Following up and conducting legal affairs',
            'Providing information to authorised persons, institutions and organisations',
          ],
          'Your personal data is not transferred to third parties for their own advertising or marketing. The transfers listed above are carried out within the conditions for processing personal data set out in the Law.',
        ],
      },
      {
        heading: '4. How We Collect Personal Data',
        blocks: [
          'By automated or partly automated means:',
          [
            `Your personal data in the contact and marketing categories is collected directly from you when you fill in the email form on the tool pages.`,
            `Your personal data in the transaction security category is added to the sign-up email when you send the form. One welcome email is then sent to your address; it does not ask you to confirm anything.`,
          ],
          'Your personal data is not collected from third parties. The personal data we collect is obtained lawfully.',
        ],
      },
      {
        heading: '5. Your Rights as a Data Subject',
        blocks: [
          'Under Article 11 of the Law on "the rights of the data subject", you have the right to learn whether your personal data is processed; to request information if it has been processed; to learn the purpose of processing and whether the data is used in line with that purpose; to know the third parties in Turkey or abroad to whom it has been transferred; to request its correction if it is incomplete or inaccurate; to request its erasure or destruction under the conditions in Article 7 of the Law; to request that these actions be notified to the third parties to whom the data has been transferred; to object to a result against you arising from analysis of the data exclusively by automated systems; and to claim compensation for damage suffered because of unlawful processing.',
          'You can send your requests regarding these rights and the application of the Law by email to contact@amdnsri.com, from the email address registered in our system or from a registered electronic mail (KEP) address. We will conclude your request free of charge as soon as possible, according to its nature, and within 30 (thirty) days at the latest.',
        ],
      },
      {
        heading: '6. How Long Personal Data Is Kept',
        blocks: [[
          `Nothing about your sign-up is stored on the hosting provider's servers.`,
          `Your sign-up is kept as one email in our mailbox in Turkey until you ask for its removal by writing to contact@amdnsri.com.`,
          `On a removal request your sign-up is deleted.`,
          `Counters used to prevent abuse are held only in the working memory of the server process and are gone when that process ends.`,
        ]],
      },
      {
        heading: '7. Information Stored in Your Browser',
        blocks: [
          `Our website and tool pages do not use cookies. Only the following is kept in your browser's local storage: the language you choose on the website and, if you change it, the light/dark theme; the language you choose on the NESTRI, NESTRI PRO and IPunch tool pages; on NESTRI and NESTRI PRO, the project you are working on, when saved; the sections you leave open in the Expanded Mesh Generator; and, after you send the email form on a tool page, a note that this device has signed up, with its date (not your email address). This information stays on your own device, is not sent to us, and can be deleted in your browser settings.`,
          'Page views are counted with Vercel Web Analytics without cookies. Typefaces are loaded from Google Fonts (see section 3).',
        ],
      },
    ],
  },

  AR: {
    title: 'إشعار الخصوصية لدى AMD NSRI',
    status: `تشمل هذه النسخة إدخال البريد الإلكتروني المطلوب قبل استخدام الأدوات المجانية. النص المعتمد هو النص التركي، أما النصّان الإنجليزي والعربي فترجمتان.`,
    intro: [
      `نحرص في AMD NSRI على ضمان أمن بياناتك الشخصية. ولهذا الغرض، وبصفتنا AMD NSRI التي تتخذ التدابير اللازمة وتولي أقصى درجات العناية لحماية البيانات الشخصية، نودّ إعلامك، وفقاً للمادة 10 من قانون حماية البيانات الشخصية رقم 6698 ("القانون")، بكيفية معالجة بياناتك الشخصية في إطار إدخال البريد الإلكتروني المطلوب قبل استخدام الأدوات المجانية على موقعنا، وفي إطار النشرة البريدية.`,
    ],
    sections: [
      {
        heading: '1. المسؤول عن البيانات',
        blocks: [
          'يعالج أحمد الناصري بياناتك الشخصية بصفته "المسؤول عن البيانات" وفق التعريف الوارد في المادة 3 من القانون.',
          'أحمد الناصري — البريد الإلكتروني: contact@amdnsri.com.',
        ],
      },
      {
        heading: '2. أغراض معالجة البيانات الشخصية وأسسها القانونية',
        blocks: [
          `تُعالَج بياناتك الشخصية التي نجمعها منك عبر نموذج البريد الإلكتروني المعروض في صفحات الأدوات على موقعنا قبل استخدامها، ضمن فئات الاتصال (عنوان بريدك الإلكتروني)، والتسويق (تفضيل موافقتك على النشرة)، وأمن المعاملات (وقت الموافقة، وإصدار نصوص الموافقة ولغتها، وصفحة الأداة التي عبّأت فيها النموذج)، للأغراض وعلى الأسس القانونية المبيّنة أدناه.`,
          'استناداً إلى موافقتك الصريحة (المادة 5/1 من القانون)، تُعالَج بياناتك ضمن فئتي الاتصال والتسويق للغرض التالي:',
          [
            `تنفيذ أنشطة التواصل (إرسال رسالة ترحيب واحدة بعد الاشتراك، والنشرة حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية) وإتاحة الوصول إلى الأدوات المجانية`,
          ],
          'استناداً إلى كون المعالجة ضرورية لوفاء المسؤول عن البيانات بالتزامه القانوني (المادة 5/2-ç من القانون)، تُعالَج بياناتك ضمن فئات الاتصال والتسويق وأمن المعاملات للأغراض التالية:',
          [
            `تنفيذ الأنشطة وفق التشريعات (إثبات الموافقة على الرسائل التجارية الإلكترونية وطلبات الحذف، والتسجيل في نظام إدارة الرسائل (İYS) إن كان ذلك منطبقاً)`,
            'تنفيذ أنشطة الحفظ والأرشفة',
            'متابعة الطلبات والشكاوى (الردّ على الطلبات المقدَّمة بموجب المادة 11 من القانون)',
            'تقديم المعلومات إلى الأشخاص والمؤسسات والهيئات المخوَّلة',
          ],
          'استناداً إلى كون المعالجة ضرورية للمصالح المشروعة للمسؤول عن البيانات، بشرط ألّا تضرّ بحقوقك وحرياتك الأساسية (المادة 5/2-f من القانون)، تُعالَج بياناتك ضمن فئتي الاتصال وأمن المعاملات للأغراض التالية:',
          [
            'تنفيذ عمليات أمن المعلومات (منع الاشتراكات الآلية والمسيئة)',
            'ضمان أمن عمليات المسؤول عن البيانات',
          ],
          `لا يُحفَظ عنوان IP الخاص بك ولا بيانات متصفحك أو جهازك. ولمنع إساءة الاستخدام، تُحصى محاولات الاشتراك لفترة قصيرة لكل عنوان شبكة ولكل عنوان بريد إلكتروني؛ ولا تحتفظ هذه العدّادات إلا برمز باتجاه واحد لا بالعنوان نفسه، ولا توجد إلا في ذاكرة عمل عملية الخادم، ولا تُكتَب في أي مكان، وتزول عند انتهاء تلك العملية.`,
          'تصل الرسائل المُرسَلة عبر نموذج التواصل على الموقع (الاسم، وعنوان البريد الإلكتروني، والموضوع، والرسالة) إلى صندوق بريدنا بالبريد الإلكتروني عبر خدمة البريد الإلكتروني Resend، ولا يحفظها الموقع.',
        ],
      },
      {
        heading: '3. الجهات التي يجوز نقل البيانات الشخصية إليها والغرض من ذلك',
        blocks: [
          'يجوز لنا نقل بياناتك الشخصية إلى الجهات التالية، للأغراض المذكورة أعلاه فقط وبالقدر الذي تقتضيه:',
          `إلى أشخاص اعتباريين من القانون الخاص نتلقى منهم خدمات؛ تُنقَل بياناتك ضمن فئات الاتصال والتسويق وأمن المعاملات لتشغيل الموقع ونموذج البريد الإلكتروني والنشرة تقنياً (تنفيذ عمليات أمن المعلومات، وأنشطة التواصل، وأنشطة الحفظ والأرشفة):`,
          [
            `Vercel (الولايات المتحدة): استضافة الموقع ونموذج البريد الإلكتروني؛ ويعمل الخادم الذي يعالج النموذج في فرانكفورت، ألمانيا؛ ويمرّ عنوان بريدك الإلكتروني عبره فقط ولا يُخزَّن فيه.`,
            `مزوّد خدمة البريد الإلكتروني turhost (Çizgi Telekomünikasyon A.Ş.) (تركيا): يُرسَل كل اشتراك، مع عنوانك وموافقاتك، كرسالة واحدة إلى صندوق البريد signups@news.amdnsri.com حيث يُحتفَظ به؛ وتُرسَل رسالة الترحيب إلى عنوانك عبر هذا المزوّد أيضاً.`,
            `Google (Google Fonts): تحميل خطوط الموقع وصفحات أدوات IPunch وNESTRI وNESTRI PRO؛ وعند فتح إحدى هذه الصفحات يُرسَل عنوان IP الخاص بك إلى Google.`,
            `jsDelivr: تحميل مكتبة برمجية لقراءة ملفات DWG عند فتح أول ملف DWG في IPunch؛ ويُرسَل عنوان IP الخاص بك إلى jsDelivr، بينما لا يغادر ملفك جهازك.`,
          ],
          `ولأن Vercel وGoogle وjsDelivr وResend تقع خارج تركيا، تُنقَل بياناتك الشخصية إلى الخارج.`,
          'إلى المؤسسات والهيئات العامة المخوَّلة؛ تُنقَل بياناتك ضمن فئات الاتصال والتسويق وأمن المعاملات فقط حيثما تقتضي التشريعات ذلك، للأغراض التالية:',
          [
            'تنفيذ الأنشطة وفق التشريعات',
            'متابعة الشؤون القانونية وتسييرها',
            'تقديم المعلومات إلى الأشخاص والمؤسسات والهيئات المخوَّلة',
          ],
          'لا تُنقَل بياناتك الشخصية إلى أطراف ثالثة لأغراض الإعلان أو التسويق الخاصة بها. وتجري عمليات النقل المذكورة أعلاه في إطار شروط معالجة البيانات الشخصية المنصوص عليها في القانون.',
        ],
      },
      {
        heading: '4. طرق جمع البيانات الشخصية',
        blocks: [
          'بوسائل آلية أو شبه آلية:',
          [
            `تُجمَع بياناتك الشخصية ضمن فئتي الاتصال والتسويق منك مباشرةً عند تعبئة نموذج البريد الإلكتروني في صفحات الأدوات.`,
            `تُضاف بياناتك الشخصية ضمن فئة أمن المعاملات إلى رسالة الاشتراك عند إرسال النموذج. ثم تُرسَل رسالة ترحيب واحدة إلى عنوانك، ولا تطلب منك تأكيد أي شيء.`,
          ],
          'لا تُجمَع بياناتك الشخصية من أطراف ثالثة، وتُحصَّل البيانات التي نجمعها بطرق مشروعة.',
        ],
      },
      {
        heading: '5. حقوقك بصفتك صاحب البيانات',
        blocks: [
          'بموجب المادة 11 من القانون الخاصة بـ"حقوق صاحب البيانات"، يحق لك أن تعرف ما إذا كانت بياناتك الشخصية تُعالَج؛ وأن تطلب معلومات عنها إن كانت قد عولجت؛ وأن تعرف غرض المعالجة وما إذا كانت تُستخدم وفقاً له؛ وأن تعرف الأطراف الثالثة التي نُقلت إليها داخل تركيا أو خارجها؛ وأن تطلب تصحيحها إن كانت ناقصة أو غير صحيحة؛ وأن تطلب محوها أو إتلافها وفق الشروط الواردة في المادة 7 من القانون؛ وأن تطلب إبلاغ الأطراف الثالثة التي نُقلت إليها بهذه الإجراءات؛ وأن تعترض على أي نتيجة ضدك ناتجة عن تحليل البيانات حصراً بواسطة أنظمة آلية؛ وأن تطالب بالتعويض عن الضرر الناجم عن معالجتها بصورة مخالفة للقانون.',
          'يمكنك إرسال طلباتك المتعلقة بهذه الحقوق وبتطبيق القانون بالبريد الإلكتروني إلى contact@amdnsri.com، من عنوان البريد الإلكتروني المسجَّل لدينا أو من عنوان بريد إلكتروني مسجَّل (KEP). وسنبتّ في طلبك مجاناً في أقرب وقت ممكن بحسب طبيعته، وخلال 30 (ثلاثين) يوماً على الأكثر.',
        ],
      },
      {
        heading: '6. مدة الاحتفاظ بالبيانات الشخصية',
        blocks: [[
          `لا يُخزَّن أي شيء يتعلق باشتراكك على خوادم مزوّد الاستضافة.`,
          `يُحتفَظ باشتراكك كرسالة واحدة في صندوق بريدنا في تركيا إلى أن تطلب حذفه بمراسلة contact@amdnsri.com.`,
          `وعند طلبك الحذف يُحذف اشتراكك.`,
          `لا تُحفَظ العدّادات المستخدمة لمنع إساءة الاستخدام إلا في ذاكرة عمل عملية الخادم، وتزول عند انتهاء تلك العملية.`,
        ]],
      },
      {
        heading: '7. المعلومات المحفوظة في متصفحك',
        blocks: [
          `لا يستخدم موقعنا ولا صفحات أدواتنا ملفات تعريف الارتباط. ولا يُحفَظ في التخزين المحلي لمتصفحك إلا ما يلي: اللغة التي تختارها على الموقع، وتفضيل السمة الفاتحة أو الداكنة إن غيّرته؛ واللغة التي تختارها في صفحات أدوات NESTRI وNESTRI PRO وIPunch؛ وفي NESTRI وNESTRI PRO، المشروع الذي تعمل عليه عند حفظه؛ والأقسام التي تتركها مفتوحة في Expanded Mesh Generator؛ وبعد إرسال نموذج البريد الإلكتروني في صفحة أداة، علامة تفيد بأن هذا الجهاز قد اشترك مع تاريخها (لا عنوان بريدك الإلكتروني). تبقى هذه المعلومات على جهازك وحده، ولا تُرسَل إلينا، ويمكن حذفها من إعدادات المتصفح.`,
          'تُحصى مشاهدات الصفحات باستخدام Vercel Web Analytics دون ملفات تعريف الارتباط. وتُحمَّل الخطوط من Google Fonts (انظر القسم 3).',
        ],
      },
    ],
  },
};

export const GATE_CONSENT: Record<Lang, LegalDoc> = {
  TR: {
    title: 'AMD NSRI Bülten Açık Rıza Beyanı',
    status: `Bu sürüm, ücretsiz araçlardan önce istenen e-posta girişini kapsar. Esas metin Türkçe metindir; İngilizce ve Arapça metinler çeviridir.`,
    intro: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, AMD NSRI olarak; yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderebilmek ve web sitemizdeki ücretsiz araçlara erişim sağlayabilmek maksadıyla kişisel verilerinizi işleyebilmek için bu konuda açık rızanıza ihtiyaç duyuyoruz.`,
    ],
    sections: [
      {
        heading: 'Hangi Kişisel Verileriniz İçin Açık Rıza Talep Ediyoruz?',
        blocks: [
          `Web sitemizdeki araç sayfalarında, araçları kullanmadan önce gösterilen e-posta formu vasıtasıyla sizlerden topladığımız iletişim (e-posta adresiniz) kategorisindeki kişisel verileriniz için açık rıza talep ediyoruz.`,
          `Onayınızın ispatı için e-posta adresinizle birlikte Türkiye'deki posta kutumuza iletilen kayıtlar (onay zamanı, onay metinlerinin sürümü ve dili ile formun doldurulduğu araç sayfası), [[AMD NSRI Aydınlatma Metni|/privacy]]'nde belirtilen diğer hukuki sebeplere dayanılarak işlenir.`,
        ],
      },
      {
        heading: 'Beyan ve Onay',
        blocks: [
          `Kişisel verilerimin [[AMD NSRI Aydınlatma Metni|/privacy]]'nde belirtilen yöntem, amaç ve hukuki sebeplerle sınırlı kalmak kaydıyla; 6698 sayılı Kanun ve diğer ilgili mevzuata uygun olarak veri sorumlusu tarafından yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderilmesi ve ücretsiz araçlara erişimimin sağlanması amacıyla kullanılmasına ve bu amaçla Aydınlatma Metni'nde belirtilen hizmet sağlayıcılara aktarılmasına açık bir şekilde rıza verdiğimi kabul ve beyan ediyorum.`,
          'Kişisel verilerimin üçüncü kişilerle onların kendi reklam veya pazarlama amaçları için paylaşılmayacağı konusunda bilgilendirildim.',
          `Bu beyanı, araç sayfalarındaki e-posta formunda yer alan iki onay kutusunu işaretleyerek ve formu göndererek veriyorum; ardından adresime, benden herhangi bir onay istemeyen bir hoş geldiniz e-postası gönderilir.`,
        ],
      },
      {
        heading: 'Bilgilendirme',
        blocks: [
          `Açık rızamı dilediğim zaman, gerekçe göstermeksizin, contact@amdnsri.com adresine yazarak geri alabileceğim ve e-posta adresimin silinmesini isteyebileceğim; rızamı geri almamın, geri almadan önce yapılan işlemleri etkilemeyeceği konusunda bilgilendirildim.`,
        ],
      },
    ],
  },

  EN: {
    title: 'AMD NSRI Newsletter Explicit Consent Statement',
    status: `This version covers the email sign-up asked for before the free tools. The Turkish text is the authoritative version; the English and Arabic texts are translations.`,
    intro: [
      `Under Personal Data Protection Law No. 6698, we at AMD NSRI need your explicit consent to process your personal data for the purpose of sending you a newsletter about new projects, journal articles and digital tool updates, and of giving you access to the free tools on our website.`,
    ],
    sections: [
      {
        heading: 'For Which Personal Data Do We Ask for Explicit Consent?',
        blocks: [
          `We ask for explicit consent for your personal data in the contact (your email address) category that we collect from you through the email form shown on the tool pages of our website before you use the tools.`,
          `The records kept as proof of your consent (time of consent, version and language of the consent texts and the tool page where you filled in the form), which are sent with your email address to our mailbox in Turkey, are processed on the other legal grounds set out in the [[AMD NSRI Privacy Notice|/privacy]].`,
        ],
      },
      {
        heading: 'Statement and Consent',
        blocks: [
          `I accept and declare that I explicitly consent to my personal data being used by the data controller, in accordance with Law No. 6698 and other relevant legislation and limited to the methods, purposes and legal grounds set out in the [[AMD NSRI Privacy Notice|/privacy]], to send me a newsletter about new projects, journal articles and digital tool updates and to give me access to the free tools, and to it being transferred for this purpose to the service providers named in the Privacy Notice.`,
          'I have been informed that my personal data will not be shared with third parties for their own advertising or marketing.',
          `I give this statement by ticking the two approval boxes on the email form on the tool pages and sending the form; after that, one welcome email is sent to my address, which does not ask me to confirm anything.`,
        ],
      },
      {
        heading: 'Information',
        blocks: [
          `I have been informed that I can withdraw my explicit consent and ask for my email address to be removed at any time, without giving a reason, by writing to contact@amdnsri.com, and that withdrawing it does not affect processing carried out before.`,
        ],
      },
    ],
  },

  AR: {
    title: 'بيان الموافقة الصريحة على النشرة البريدية لدى AMD NSRI',
    status: `تشمل هذه النسخة إدخال البريد الإلكتروني المطلوب قبل استخدام الأدوات المجانية. النص المعتمد هو النص التركي، أما النصّان الإنجليزي والعربي فترجمتان.`,
    intro: [
      `في إطار قانون حماية البيانات الشخصية رقم 6698، نحتاج في AMD NSRI إلى موافقتك الصريحة لكي نتمكن من معالجة بياناتك الشخصية بغرض إرسال نشرة بريدية إليك حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية، وإتاحة الوصول إلى الأدوات المجانية على موقعنا.`,
    ],
    sections: [
      {
        heading: 'ما البيانات الشخصية التي نطلب موافقتك الصريحة عليها؟',
        blocks: [
          `نطلب موافقتك الصريحة على بياناتك الشخصية ضمن فئة الاتصال (عنوان بريدك الإلكتروني) التي نجمعها منك عبر نموذج البريد الإلكتروني المعروض في صفحات الأدوات على موقعنا قبل استخدامها.`,
          `أما السجلات المحفوظة لإثبات موافقتك (وقت الموافقة، وإصدار نصوص الموافقة ولغتها، وصفحة الأداة التي عبّأت فيها النموذج)، التي تُرسَل مع عنوان بريدك الإلكتروني إلى صندوق بريدنا في تركيا، فتُعالَج استناداً إلى الأسس القانونية الأخرى المبيّنة في [[إشعار الخصوصية لدى AMD NSRI|/privacy]].`,
        ],
      },
      {
        heading: 'البيان والموافقة',
        blocks: [
          `أقرّ وأُعلن أنني أوافق صراحةً على أن يستخدم المسؤول عن البيانات بياناتي الشخصية، وفقاً للقانون رقم 6698 والتشريعات الأخرى ذات الصلة، وفي حدود الطرق والأغراض والأسس القانونية المبيّنة في [[إشعار الخصوصية لدى AMD NSRI|/privacy]]، لإرسال نشرة بريدية إليّ حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية ولإتاحة الوصول إلى الأدوات المجانية لي، وعلى نقلها لهذا الغرض إلى مزوّدي الخدمات المذكورين في إشعار الخصوصية.`,
          'وقد أُعلمت بأن بياناتي الشخصية لن تُشارَك مع أطراف ثالثة لأغراض الإعلان أو التسويق الخاصة بها.',
          `وأقدّم هذا البيان بوضع علامة في مربّعَي الموافقة في نموذج البريد الإلكتروني بصفحات الأدوات، ثم بإرسال النموذج؛ وبعد ذلك تُرسَل إلى عنواني رسالة ترحيب واحدة لا تطلب مني تأكيد أي شيء.`,
        ],
      },
      {
        heading: 'الإعلام',
        blocks: [
          `أُعلمت بأنني أستطيع سحب موافقتي الصريحة وطلب حذف عنوان بريدي الإلكتروني في أي وقت ودون إبداء أسباب، بمراسلة contact@amdnsri.com، وبأن سحبها لا يؤثر في المعالجة التي جرت قبل ذلك.`,
        ],
      },
    ],
  },
};
