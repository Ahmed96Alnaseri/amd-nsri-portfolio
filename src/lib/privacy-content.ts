import type { Lang } from '@/lib/translations';

/**
 * DRAFT privacy notice (/privacy) under Article 10 of Law No. 6698 (KVKK), following the structure and wording of the
 * notice the site owner's lawyer provided, narrowed to what this site really does (newsletter sign-up, browser storage).
 * Turkish is the source text; EN and AR are Claude's translations, for review. Square brackets mark everything still
 * to be confirmed. A block is a paragraph (string) or a bullet list (string[]); [[text|/path]] is a link.
 */
export interface LegalDoc {
  draft: string;
  title: string;
  status: string;
  intro: string[];
  sections: { heading: string; blocks: (string | string[])[] }[];
}

export const PRIVACY: Record<Lang, LegalDoc> = {
  TR: {
    draft: 'TASLAK: avukat incelemesini bekliyor, yürürlükte değil. [Köşeli parantez] içindeki ifadeler yayından önce teyit edilecektir.',
    title: 'AMD NSRI Aydınlatma Metni',
    status: 'Ekim 2026\'da hazırlanan taslak; henüz yürürlükte değil. Esas metin Türkçe metindir; İngilizce ve Arapça metinler çeviridir [AVUKAT TEYİT EDECEK].',
    intro: [
      'AMD NSRI olarak kişisel verilerinizin güvenliğinin sağlanmasına önem veriyoruz. Bu amaçla, kişisel verilerin korunması için gerekli önlemleri alan ve azami hassasiyet gösteren AMD NSRI olarak, web sitemizdeki bülten aboneliği kapsamında kişisel verilerinizin işlenmesi hususunda sizleri 6698 sayılı Kişisel Verilerin Korunması Kanunu\'nun ("Kanun") 10. maddesi uyarınca bilgilendirmek isteriz.',
    ],
    sections: [
      {
        heading: '1. Veri Sorumlusu',
        blocks: [
          'Kişisel verileriniz, Kanun\'un 3. maddesinde tanımlı "Veri Sorumlusu" sıfatıyla Ahmed Alnaseri tarafından işlenmektedir.',
          'Ahmed Alnaseri — Adresi: [posta adresi sağlanacak], E-posta adresi: contact@amdnsri.com [AVUKAT TEYİT EDECEK: hukuki statü ile başka kimlik bilgilerinin, örneğin vergi kimlik numarasının, yer alması gerekip gerekmediği].',
        ],
      },
      {
        heading: '2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri',
        blocks: [
          'Web sitemizdeki bülten abonelik formu ve onay e-postası aracılığıyla sizlerden toplanan kimlik (isteğe bağlı olarak paylaştığınız adınız), iletişim (e-posta adresiniz), pazarlama (bülten onay tercihiniz, aboneliğinizin durumu ve İleti Yönetim Sistemi kayıt durumu) ve işlem güvenliği (onay zamanı, onay metninin sürümü ve gösterildiği dil, abone olunan sayfa, onaylama ve abonelikten çıkma zamanları) kategorilerindeki kişisel verileriniz aşağıda belirtilen amaç ve hukuki sebeplerle işlenmektedir.',
          'Açık rızanızın bulunması (Kanun m. 5/1) sebebine dayanılarak [AVUKAT TEYİT EDECEK]; kimlik, iletişim ve pazarlama kategorilerindeki verileriniz aşağıdaki amaçla işlenir:',
          [
            'İletişim Faaliyetlerinin Yürütülmesi (yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderilmesi ve aboneliğin onaylanması için tek bir onay e-postası gönderilmesi)',
          ],
          'Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (Kanun m. 5/2-ç) sebebine dayanılarak [AVUKAT TEYİT EDECEK]; iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz aşağıdaki amaçlarla işlenir:',
          [
            'Faaliyetlerin Mevzuata Uygun Yürütülmesi (ticari elektronik ileti onayının ve ret talebinin ispatı, abonelikten çıkan adreslerin yeniden e-posta almaması için e-posta gönderilmeyecekler listesinin tutulması ve uygulanması hâlinde İleti Yönetim Sistemi\'ne (İYS) kayıt [AVUKAT TEYİT EDECEK: İYS kaydının uygulanıp uygulanmadığı])',
            'Saklama ve Arşiv Faaliyetlerinin Yürütülmesi',
            'Talep / Şikayetlerin Takibi (Kanun\'un 11. maddesi kapsamındaki başvuruların yanıtlanması)',
            'Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi',
          ],
          'İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (Kanun m. 5/2-f) sebebine dayanılarak [AVUKAT TEYİT EDECEK]; iletişim ve işlem güvenliği kategorilerindeki verileriniz aşağıdaki amaçlarla işlenir:',
          [
            'Bilgi Güvenliği Süreçlerinin Yürütülmesi (otomatik ve kötüye kullanım amaçlı kayıtların engellenmesi)',
            'Veri Sorumlusu Operasyonlarının Güvenliğinin Temini',
          ],
          'IP adresiniz ile tarayıcınıza ve cihazınıza ilişkin bilgiler saklanmaz. Kötüye kullanımı önlemek için kayıt denemeleri kısa bir süre boyunca ağ adresi ve e-posta adresi başına sayılır; bu sayaçlar adresin kendisini değil, yalnızca tek yönlü bir kodu tutar ve iki gün içinde silinir.',
          '[AVUKAT TEYİT EDECEK: web sitesindeki iletişim formunun bu metne mi yoksa ayrı bir metne mi alınacağı.]',
        ],
      },
      {
        heading: '3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği',
        blocks: [
          'İşlediğimiz kişisel verilerinizi, yalnızca yukarıdaki amaçlarla ve bu amaçlar için gerekli olduğu ölçüde aşağıdaki taraflara aktarabilmekteyiz:',
          'Hizmet aldığımız Özel Hukuk Tüzel Kişilerine; kimlik, iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz, web sitesinin ve bültenin teknik olarak çalıştırılması (Bilgi Güvenliği Süreçlerinin Yürütülmesi, İletişim Faaliyetlerinin Yürütülmesi, Saklama ve Arşiv Faaliyetlerinin Yürütülmesi) amacıyla aktarılır [YAYINDAN ÖNCE TEYİT EDİLECEK: sağlayıcılar, bölgeler ve sözleşme koşulları]:',
          [
            'Vercel (Amerika Birleşik Devletleri): web sitesinin ve abonelik formunun barındırılması [TEYİT EDİLECEK: sunucu bölgesi].',
            'Neon: bülten veri tabanı; sunucu bölgesi Frankfurt, Almanya [TEYİT EDİLECEK: kurulumda seçilen bölge ve şirketin bulunduğu ülke].',
            'Resend (Amerika Birleşik Devletleri): onay e-postasının iletilmesi. Resend, e-posta kayıtları dahil hesap verilerini Amerika Birleşik Devletleri\'nde sakladığını belirtmektedir.',
            'Google (Google Fonts): web sitesinin ve araç sayfalarının yazı tiplerinin yüklenmesi; bir sayfa açıldığında IP adresiniz Google\'a iletilir [AVUKAT TEYİT EDECEK].',
          ],
          'Bu sağlayıcıların tamamı Türkiye dışında bulunduğundan kişisel verileriniz yurt dışına aktarılmaktadır. Bu aktarımın Kanun\'un 9. maddesi kapsamındaki dayanağı: [AVUKAT TEYİT EDECEK].',
          'Yetkili Kamu Kurum ve Kuruluşlarına; kimlik, iletişim, pazarlama ve işlem güvenliği kategorilerindeki verileriniz, yalnızca mevzuatın gerektirdiği hâllerde aşağıdaki amaçlarla aktarılır:',
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
            'Kimlik, iletişim ve pazarlama kategorilerindeki kişisel verileriniz, web sitemizdeki bülten abonelik formunu doldurduğunuzda doğrudan sizden toplanmaktadır.',
            'İşlem güvenliği kategorisindeki kişisel verileriniz, formu gönderdiğinizde, onay e-postasındaki bağlantıya tıkladığınızda ve abonelikten çıktığınızda sistem tarafından kaydedilmektedir.',
          ],
          'Kişisel verileriniz üçüncü kişilerden toplanmamaktadır. Topladığımız kişisel verileriniz yasal yollardan elde edilmektedir.',
        ],
      },
      {
        heading: '5. İlgili Kişi Olarak Haklarınız',
        blocks: [
          'Kanun\'un "ilgili kişinin hakları"nı düzenleyen 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme, Kanun\'un 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme, bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.',
          'Bu haklarınıza ve Kanun\'un uygulamasına ilişkin taleplerinizi yazılı olarak veya kayıtlı elektronik posta (KEP) adresi ya da sistemimizde kayıtlı bulunan e-posta adresinizi kullanmak suretiyle ya da Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ\'de öngörülen diğer başvuru usullerine uygun olarak contact@amdnsri.com adresine iletebilirsiniz [AVUKAT TEYİT EDECEK: yazılı başvurular için posta adresi]. Talebinizi niteliğine göre en kısa sürede ve en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandıracağız.',
        ],
      },
      {
        heading: '6. Kişisel Verilerin Saklanma Süresi',
        blocks: [[
          'Onaylanmayan abonelik talepleri, talepten 7 gün sonra otomatik olarak silinir.',
          'Onaylanmış abonelikler, abonelikten çıkana veya silinmesini talep edene kadar saklanır.',
          'Abonelikten çıktığınızda kaydınız "abonelikten çıktı" olarak işaretlenir ve onay ile ret işlemlerinin ispatı için saklanır; ayrıca adresinizin tek yönlü kodu, yanlışlıkla yeniden eklenmemeniz için e-posta gönderilmeyecekler listesinde tutulur. Silme talebinizde kaydınız silinir; isterseniz yalnızca bu tek yönlü kod tutulur [AVUKAT TEYİT EDECEK: onay ve ret kayıtları için yasal saklama süresi].',
          'Kötüye kullanımı önlemeye yönelik sayaçlar iki gün içinde silinir.',
        ]],
      },
      {
        heading: '7. Tarayıcınızda Saklanan Bilgiler',
        blocks: [
          'Web sitemiz ve araç sayfalarımız çerez kullanmaz. Tarayıcınızın yerel depolama alanında yalnızca şunlar tutulur: web sitesinde seçtiğiniz dil ve değiştirdiyseniz açık/koyu tema tercihi; NESTRI, NESTRI PRO ve IPunch araç sayfalarında seçtiğiniz dil; NESTRI ve NESTRI PRO\'da kaydedilen, üzerinde çalıştığınız proje. Bu bilgiler yalnızca kendi cihazınızda kalır, bize gönderilmez ve tarayıcı ayarlarınızdan silinebilir.',
          'Sayfa görüntülemeleri Vercel Web Analytics ile çerez kullanılmadan sayılır [TEYİT EDİLECEK]. Yazı tipleri Google Fonts\'tan yüklenir (bkz. 3. bölüm).',
        ],
      },
    ],
  },

  EN: {
    draft: 'DRAFT: awaiting review by a lawyer, not in force. Text in [square brackets] is to be confirmed before publishing.',
    title: 'AMD NSRI Privacy Notice',
    status: 'Draft prepared in October 2026; not yet in force. The Turkish text is the authoritative version; the English and Arabic texts are translations [LAWYER TO CONFIRM].',
    intro: [
      'At AMD NSRI we care about keeping your personal data secure. As AMD NSRI, taking the necessary measures and the utmost care to protect personal data, we would like to inform you, under Article 10 of Personal Data Protection Law No. 6698 (the "Law"), about how your personal data is processed in connection with the newsletter sign-up on our website.',
    ],
    sections: [
      {
        heading: '1. Data Controller',
        blocks: [
          'Your personal data is processed by Ahmed Alnaseri in the capacity of "Data Controller" as defined in Article 3 of the Law.',
          'Ahmed Alnaseri — Address: [postal address to be provided], Email: contact@amdnsri.com [LAWYER TO CONFIRM: legal status, and whether other identifying details such as a tax identification number must be listed].',
        ],
      },
      {
        heading: '2. Purposes and Legal Grounds for Processing',
        blocks: [
          'Your personal data in the categories of identity (your name, if you choose to give it), contact (your email address), marketing (your newsletter consent preference, the status of your subscription and its Message Management System registration status) and transaction security (time of consent, version and language of the consent text, the page you subscribed from, and the times you confirmed and unsubscribed), collected from you through the newsletter sign-up form on our website and the confirmation email, is processed for the purposes and on the legal grounds set out below.',
          'On the ground of your explicit consent (Law, Art. 5/1) [LAWYER TO CONFIRM], your data in the identity, contact and marketing categories is processed for the following purpose:',
          [
            'Carrying out communication activities (sending the newsletter about new projects, journal articles and digital tool updates, and one confirmation email to confirm the subscription)',
          ],
          'On the ground that processing is necessary for the data controller to comply with a legal obligation (Law, Art. 5/2-ç) [LAWYER TO CONFIRM], your data in the contact, marketing and transaction security categories is processed for the following purposes:',
          [
            'Carrying out activities in compliance with the legislation (proof of consent to commercial electronic messages and of opt-out requests, keeping a do-not-email list so that unsubscribed addresses receive no further emails, and, where applicable, registration with the Message Management System (İYS) [LAWYER TO CONFIRM: whether İYS registration applies])',
            'Carrying out storage and archiving activities',
            'Following up requests and complaints (answering applications under Article 11 of the Law)',
            'Providing information to authorised persons, institutions and organisations',
          ],
          'On the ground that processing is necessary for the legitimate interests of the data controller, provided that it does not harm your fundamental rights and freedoms (Law, Art. 5/2-f) [LAWYER TO CONFIRM], your data in the contact and transaction security categories is processed for the following purposes:',
          [
            'Carrying out information security processes (preventing automated and abusive sign-ups)',
            'Ensuring the security of the data controller\'s operations',
          ],
          'Your IP address and details of your browser or device are not stored. To prevent abuse, sign-up attempts are counted for a short time per network address and per email address; these counters hold only a one-way code, not the address itself, and are deleted within two days.',
          '[LAWYER TO CONFIRM: whether the contact form on the website belongs in this notice or in a separate one.]',
        ],
      },
      {
        heading: '3. To Whom and for What Purpose Personal Data May Be Transferred',
        blocks: [
          'We may transfer your personal data to the parties below, only for the purposes above and only as far as these purposes require:',
          'To private-law legal entities that provide services to us, your data in the identity, contact, marketing and transaction security categories is transferred for running the website and the newsletter technically (carrying out information security processes, communication activities, and storage and archiving activities) [TO CONFIRM before publishing: providers, regions and contract terms]:',
          [
            'Vercel (United States): hosting of the website and the sign-up form [TO CONFIRM: server region].',
            'Neon: the newsletter database; server region Frankfurt, Germany [TO CONFIRM: region chosen at setup, and the company\'s country].',
            'Resend (United States): delivery of the confirmation email. Resend states that it stores account data, including email logs, in the United States.',
            'Google (Google Fonts): loading the typefaces of the website and the tool pages; when a page opens, your IP address is sent to Google [LAWYER TO CONFIRM].',
          ],
          'Since all of these providers are located outside Turkey, your personal data is transferred abroad. Basis for this transfer under Article 9 of the Law: [LAWYER TO CONFIRM].',
          'To authorised public institutions and organisations, your data in the identity, contact, marketing and transaction security categories is transferred only where the legislation requires it, for the following purposes:',
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
            'Your personal data in the identity, contact and marketing categories is collected directly from you when you fill in the newsletter sign-up form on our website.',
            'Your personal data in the transaction security category is recorded by the system when you send the form, when you click the link in the confirmation email and when you unsubscribe.',
          ],
          'Your personal data is not collected from third parties. The personal data we collect is obtained lawfully.',
        ],
      },
      {
        heading: '5. Your Rights as a Data Subject',
        blocks: [
          'Under Article 11 of the Law on "the rights of the data subject", you have the right to learn whether your personal data is processed; to request information if it has been processed; to learn the purpose of processing and whether the data is used in line with that purpose; to know the third parties in Turkey or abroad to whom it has been transferred; to request its correction if it is incomplete or inaccurate; to request its erasure or destruction under the conditions in Article 7 of the Law; to request that these actions be notified to the third parties to whom the data has been transferred; to object to a result against you arising from analysis of the data exclusively by automated systems; and to claim compensation for damage suffered because of unlawful processing.',
          'You can send your requests regarding these rights and the application of the Law to contact@amdnsri.com in writing, or by using a registered electronic mail (KEP) address or the email address registered in our system, or by other methods provided for in the Communiqué on the Procedures and Principles of Application to the Data Controller [LAWYER TO CONFIRM: postal address for written applications]. We will conclude your request free of charge as soon as possible, according to its nature, and within 30 (thirty) days at the latest.',
        ],
      },
      {
        heading: '6. How Long Personal Data Is Kept',
        blocks: [[
          'Sign-ups that are not confirmed are deleted automatically 7 days after the request.',
          'Confirmed subscriptions are kept until you unsubscribe or ask for deletion.',
          'When you unsubscribe, your record is marked as unsubscribed and kept as proof of the consent and the opt-out; in addition, a one-way code of your address is kept on the do-not-email list so that you are not added again by mistake. On a deletion request your record is deleted; if you wish, only that one-way code is kept [LAWYER TO CONFIRM: legal retention period for consent and opt-out records].',
          'Counters used to prevent abuse are deleted within two days.',
        ]],
      },
      {
        heading: '7. Information Stored in Your Browser',
        blocks: [
          'Our website and tool pages do not use cookies. Only the following is kept in your browser\'s local storage: the language you choose on the website and, if you change it, the light/dark theme; the language you choose on the NESTRI, NESTRI PRO and IPunch tool pages; and, on NESTRI and NESTRI PRO, the project you are working on, when saved. This information stays on your own device, is not sent to us, and can be deleted in your browser settings.',
          'Page views are counted with Vercel Web Analytics without cookies [TO CONFIRM]. Typefaces are loaded from Google Fonts (see section 3).',
        ],
      },
    ],
  },

  AR: {
    draft: 'مسودة: بانتظار مراجعة محامٍ، وغير سارية. ما بين [معقوفين] يجب التحقق منه قبل النشر.',
    title: 'إشعار الخصوصية لدى AMD NSRI',
    status: 'مسودة أُعدّت في أكتوبر 2026، وهي غير سارية بعد. النص المعتمد هو النص التركي، أما النصّان الإنجليزي والعربي فترجمتان [يؤكّده المحامي].',
    intro: [
      'نحرص في AMD NSRI على ضمان أمن بياناتك الشخصية. ولهذا الغرض، وبصفتنا AMD NSRI التي تتخذ التدابير اللازمة وتولي أقصى درجات العناية لحماية البيانات الشخصية، نودّ إعلامك، وفقاً للمادة 10 من قانون حماية البيانات الشخصية رقم 6698 ("القانون")، بكيفية معالجة بياناتك الشخصية في إطار الاشتراك في النشرة البريدية على موقعنا.',
    ],
    sections: [
      {
        heading: '1. المسؤول عن البيانات',
        blocks: [
          'يعالج أحمد الناصري بياناتك الشخصية بصفته "المسؤول عن البيانات" وفق التعريف الوارد في المادة 3 من القانون.',
          'أحمد الناصري — العنوان: [يُقدَّم العنوان البريدي لاحقاً]، البريد الإلكتروني: contact@amdnsri.com [يؤكّده المحامي: الصفة القانونية، ومدى لزوم ذكر بيانات تعريفية أخرى مثل الرقم الضريبي].',
        ],
      },
      {
        heading: '2. أغراض معالجة البيانات الشخصية وأسسها القانونية',
        blocks: [
          'تُعالَج بياناتك الشخصية التي نجمعها منك عبر نموذج الاشتراك في النشرة على موقعنا وعبر رسالة التأكيد، ضمن فئات الهوية (اسمك إن اخترت إدخاله)، والاتصال (عنوان بريدك الإلكتروني)، والتسويق (تفضيل موافقتك على النشرة، وحالة اشتراكك، وحالة تسجيله في نظام إدارة الرسائل)، وأمن المعاملات (وقت الموافقة، وإصدار نص الموافقة ولغته، والصفحة التي اشتركت منها، ووقتا التأكيد وإلغاء الاشتراك)، للأغراض وعلى الأسس القانونية المبيّنة أدناه.',
          'استناداً إلى موافقتك الصريحة (المادة 5/1 من القانون) [يؤكّده المحامي]، تُعالَج بياناتك ضمن فئات الهوية والاتصال والتسويق للغرض التالي:',
          [
            'تنفيذ أنشطة التواصل (إرسال النشرة حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية، وإرسال رسالة تأكيد واحدة لتأكيد الاشتراك)',
          ],
          'استناداً إلى كون المعالجة ضرورية لوفاء المسؤول عن البيانات بالتزامه القانوني (المادة 5/2-ç من القانون) [يؤكّده المحامي]، تُعالَج بياناتك ضمن فئات الاتصال والتسويق وأمن المعاملات للأغراض التالية:',
          [
            'تنفيذ الأنشطة وفق التشريعات (إثبات الموافقة على الرسائل التجارية الإلكترونية وطلبات إلغاء الاشتراك، والاحتفاظ بقائمة عدم المراسلة كي لا تتلقى العناوين الملغى اشتراكها رسائل أخرى، والتسجيل في نظام إدارة الرسائل (İYS) إن كان ذلك منطبقاً [يؤكّده المحامي: مدى انطباق التسجيل في İYS])',
            'تنفيذ أنشطة الحفظ والأرشفة',
            'متابعة الطلبات والشكاوى (الردّ على الطلبات المقدَّمة بموجب المادة 11 من القانون)',
            'تقديم المعلومات إلى الأشخاص والمؤسسات والهيئات المخوَّلة',
          ],
          'استناداً إلى كون المعالجة ضرورية للمصالح المشروعة للمسؤول عن البيانات، بشرط ألّا تضرّ بحقوقك وحرياتك الأساسية (المادة 5/2-f من القانون) [يؤكّده المحامي]، تُعالَج بياناتك ضمن فئتي الاتصال وأمن المعاملات للأغراض التالية:',
          [
            'تنفيذ عمليات أمن المعلومات (منع الاشتراكات الآلية والمسيئة)',
            'ضمان أمن عمليات المسؤول عن البيانات',
          ],
          'لا يُحفَظ عنوان IP الخاص بك ولا بيانات متصفحك أو جهازك. ولمنع إساءة الاستخدام، تُحصى محاولات الاشتراك لفترة قصيرة لكل عنوان شبكة ولكل عنوان بريد إلكتروني؛ ولا تحتفظ هذه العدّادات إلا برمز باتجاه واحد لا بالعنوان نفسه، وتُحذف خلال يومين.',
          '[يؤكّده المحامي: ما إذا كان نموذج التواصل على الموقع يدخل في هذا الإشعار أم في إشعار مستقل.]',
        ],
      },
      {
        heading: '3. الجهات التي يجوز نقل البيانات الشخصية إليها والغرض من ذلك',
        blocks: [
          'يجوز لنا نقل بياناتك الشخصية إلى الجهات التالية، للأغراض المذكورة أعلاه فقط وبالقدر الذي تقتضيه:',
          'إلى أشخاص اعتباريين من القانون الخاص نتلقى منهم خدمات؛ تُنقَل بياناتك ضمن فئات الهوية والاتصال والتسويق وأمن المعاملات لتشغيل الموقع والنشرة تقنياً (تنفيذ عمليات أمن المعلومات، وأنشطة التواصل، وأنشطة الحفظ والأرشفة) [يُتحقَّق منه قبل النشر: المزوّدون والمناطق وشروط التعاقد]:',
          [
            'Vercel (الولايات المتحدة): استضافة الموقع ونموذج الاشتراك [يُستكمَل: منطقة الخادم].',
            'Neon: قاعدة بيانات النشرة؛ منطقة الخادم فرانكفورت، ألمانيا [يُستكمَل: المنطقة المختارة عند الإعداد، وبلد الشركة].',
            'Resend (الولايات المتحدة): إيصال رسالة التأكيد. وتذكر Resend أنها تحفظ بيانات الحساب، بما فيها سجلات البريد، في الولايات المتحدة.',
            'Google (Google Fonts): تحميل خطوط الموقع وصفحات الأدوات؛ وعند فتح أي صفحة يُرسَل عنوان IP الخاص بك إلى Google [يؤكّده المحامي].',
          ],
          'ولأن جميع هؤلاء المزوّدين يقعون خارج تركيا، تُنقَل بياناتك الشخصية إلى الخارج. الأساس القانوني لهذا النقل بموجب المادة 9 من القانون: [يؤكّده المحامي].',
          'إلى المؤسسات والهيئات العامة المخوَّلة؛ تُنقَل بياناتك ضمن فئات الهوية والاتصال والتسويق وأمن المعاملات فقط حيثما تقتضي التشريعات ذلك، للأغراض التالية:',
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
            'تُجمَع بياناتك الشخصية ضمن فئات الهوية والاتصال والتسويق منك مباشرةً عند تعبئة نموذج الاشتراك في النشرة على موقعنا.',
            'تُسجَّل بياناتك الشخصية ضمن فئة أمن المعاملات تلقائياً عند إرسال النموذج، وعند النقر على الرابط في رسالة التأكيد، وعند إلغاء الاشتراك.',
          ],
          'لا تُجمَع بياناتك الشخصية من أطراف ثالثة، وتُحصَّل البيانات التي نجمعها بطرق مشروعة.',
        ],
      },
      {
        heading: '5. حقوقك بصفتك صاحب البيانات',
        blocks: [
          'بموجب المادة 11 من القانون الخاصة بـ"حقوق صاحب البيانات"، يحق لك أن تعرف ما إذا كانت بياناتك الشخصية تُعالَج؛ وأن تطلب معلومات عنها إن كانت قد عولجت؛ وأن تعرف غرض المعالجة وما إذا كانت تُستخدم وفقاً له؛ وأن تعرف الأطراف الثالثة التي نُقلت إليها داخل تركيا أو خارجها؛ وأن تطلب تصحيحها إن كانت ناقصة أو غير صحيحة؛ وأن تطلب محوها أو إتلافها وفق الشروط الواردة في المادة 7 من القانون؛ وأن تطلب إبلاغ الأطراف الثالثة التي نُقلت إليها بهذه الإجراءات؛ وأن تعترض على أي نتيجة ضدك ناتجة عن تحليل البيانات حصراً بواسطة أنظمة آلية؛ وأن تطالب بالتعويض عن الضرر الناجم عن معالجتها بصورة مخالفة للقانون.',
          'يمكنك إرسال طلباتك المتعلقة بهذه الحقوق وبتطبيق القانون إلى contact@amdnsri.com كتابةً، أو باستخدام عنوان بريد إلكتروني مسجَّل (KEP) أو عنوان البريد الإلكتروني المسجَّل لدينا، أو وفق طرق التقديم الأخرى المنصوص عليها في البلاغ الخاص بإجراءات ومبادئ تقديم الطلبات إلى المسؤول عن البيانات [يؤكّده المحامي: العنوان البريدي للطلبات الكتابية]. وسنبتّ في طلبك مجاناً في أقرب وقت ممكن بحسب طبيعته، وخلال 30 (ثلاثين) يوماً على الأكثر.',
        ],
      },
      {
        heading: '6. مدة الاحتفاظ بالبيانات الشخصية',
        blocks: [[
          'تُحذف طلبات الاشتراك غير المؤكَّدة تلقائياً بعد 7 أيام من الطلب.',
          'يُحتفَظ بالاشتراكات المؤكَّدة إلى أن تلغي اشتراكك أو تطلب الحذف.',
          'عند إلغاء اشتراكك يُوسَم سجلك بأنه ملغى، ويُحتفَظ به لإثبات الموافقة وإلغاء الاشتراك؛ كما يُحتفَظ برمز باتجاه واحد لعنوانك في قائمة عدم المراسلة حتى لا يُضاف مجدداً عن طريق الخطأ. وعند طلبك الحذف يُحذف سجلك، ويمكن بناءً على رغبتك الاحتفاظ بهذا الرمز وحده [يؤكّده المحامي: مدة الحفظ القانونية لسجلات الموافقة وإلغاء الاشتراك].',
          'تُحذف العدّادات المستخدمة لمنع إساءة الاستخدام خلال يومين.',
        ]],
      },
      {
        heading: '7. المعلومات المحفوظة في متصفحك',
        blocks: [
          'لا يستخدم موقعنا ولا صفحات أدواتنا ملفات تعريف الارتباط. ولا يُحفَظ في التخزين المحلي لمتصفحك إلا ما يلي: اللغة التي تختارها على الموقع، وتفضيل السمة الفاتحة أو الداكنة إن غيّرته؛ واللغة التي تختارها في صفحات أدوات NESTRI وNESTRI PRO وIPunch؛ وفي NESTRI وNESTRI PRO، المشروع الذي تعمل عليه عند حفظه. تبقى هذه المعلومات على جهازك وحده، ولا تُرسَل إلينا، ويمكن حذفها من إعدادات المتصفح.',
          'تُحصى مشاهدات الصفحات باستخدام Vercel Web Analytics دون ملفات تعريف الارتباط [يُتحقَّق منه]. وتُحمَّل الخطوط من Google Fonts (انظر القسم 3).',
        ],
      },
    ],
  },
};
