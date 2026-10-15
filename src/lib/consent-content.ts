import type { Lang } from '@/lib/translations';
import type { LegalDoc } from '@/lib/privacy-content';

/**
 * DRAFT explicit consent statement for the newsletter (/consent), following the structure and wording of the
 * statement the site owner's lawyer provided, narrowed to this newsletter only. Linked from the sign-up checkbox.
 * Turkish is the source text; EN and AR are Claude's translations, for review. [[text|/path]] is a link.
 */
export const CONSENT: Record<Lang, LegalDoc> = {
  TR: {
    draft: 'TASLAK: avukat incelemesini bekliyor, yürürlükte değil. [Köşeli parantez] içindeki ifadeler yayından önce teyit edilecektir.',
    title: 'AMD NSRI Bülten Açık Rıza Beyanı',
    status: 'Ekim 2026\'da hazırlanan taslak; henüz yürürlükte değil. Esas metin Türkçe metindir; İngilizce ve Arapça metinler çeviridir [AVUKAT TEYİT EDECEK].',
    intro: [
      '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, AMD NSRI olarak; yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderebilmek maksadıyla kişisel verilerinizi işleyebilmek için bu konuda açık rızanıza ihtiyaç duyuyoruz.',
    ],
    sections: [
      {
        heading: 'Hangi Kişisel Verileriniz İçin Açık Rıza Talep Ediyoruz?',
        blocks: [
          'Web sitemizdeki bülten abonelik formu vasıtasıyla sizlerden topladığımız iletişim (e-posta adresiniz) ve kimlik (isteğe bağlı olarak paylaştığınız adınız) kategorilerindeki kişisel verileriniz için açık rıza talep ediyoruz.',
          'Onayınızın ispatı için tutulan kayıtlar (onay zamanı, onay metninin sürümü ve abone olunan sayfa), [[AMD NSRI Aydınlatma Metni|/privacy]]\'nde belirtilen diğer hukuki sebeplere dayanılarak işlenir [AVUKAT TEYİT EDECEK].',
        ],
      },
      {
        heading: 'Beyan ve Onay',
        blocks: [
          'Kişisel verilerimin [[AMD NSRI Aydınlatma Metni|/privacy]]\'nde belirtilen yöntem, amaç ve hukuki sebeplerle sınırlı kalmak kaydıyla; 6698 sayılı Kanun ve diğer ilgili mevzuata uygun olarak veri sorumlusu tarafından yeni projeler, günlük yazıları ve dijital araç güncellemeleri hakkında bülten gönderilmesi amacıyla kullanılmasına ve bu amaçla Aydınlatma Metni\'nde belirtilen hizmet sağlayıcılara aktarılmasına açık bir şekilde rıza verdiğimi kabul ve beyan ediyorum [AVUKAT TEYİT EDECEK: yurt dışına aktarım için ayrıca açık rıza gerekip gerekmediği].',
          'Kişisel verilerimin üçüncü kişilerle onların kendi reklam veya pazarlama amaçları için paylaşılmayacağı konusunda bilgilendirildim.',
          'Bu beyanı, abonelik formundaki onay kutusunu işaretleyerek ve ardından onay e-postasındaki bağlantıya tıklayarak veriyorum.',
        ],
      },
      {
        heading: 'Bilgilendirme',
        blocks: [
          'Açık rızamı dilediğim zaman, gerekçe göstermeksizin, her e-postada yer alan abonelikten çıkma bağlantısını kullanarak veya contact@amdnsri.com adresine yazarak geri alabileceğim; rızamı geri almamın, geri almadan önce yapılan işlemleri etkilemeyeceği konusunda bilgilendirildim.',
        ],
      },
    ],
  },

  EN: {
    draft: 'DRAFT: awaiting review by a lawyer, not in force. Text in [square brackets] is to be confirmed before publishing.',
    title: 'AMD NSRI Newsletter Explicit Consent Statement',
    status: 'Draft prepared in October 2026; not yet in force. The Turkish text is the authoritative version; the English and Arabic texts are translations [LAWYER TO CONFIRM].',
    intro: [
      'Under Personal Data Protection Law No. 6698, we at AMD NSRI need your explicit consent to process your personal data for the purpose of sending you a newsletter about new projects, journal articles and digital tool updates.',
    ],
    sections: [
      {
        heading: 'For Which Personal Data Do We Ask for Explicit Consent?',
        blocks: [
          'We ask for explicit consent for your personal data in the contact (your email address) and identity (your name, if you choose to give it) categories that we collect from you through the newsletter sign-up form on our website.',
          'The records kept as proof of your consent (time of consent, version of the consent text and the page you subscribed from) are processed on the other legal grounds set out in the [[AMD NSRI Privacy Notice|/privacy]] [LAWYER TO CONFIRM].',
        ],
      },
      {
        heading: 'Statement and Consent',
        blocks: [
          'I accept and declare that I explicitly consent to my personal data being used by the data controller, in accordance with Law No. 6698 and other relevant legislation and limited to the methods, purposes and legal grounds set out in the [[AMD NSRI Privacy Notice|/privacy]], to send me a newsletter about new projects, journal articles and digital tool updates, and to it being transferred for this purpose to the service providers named in the Privacy Notice [LAWYER TO CONFIRM: whether a separate explicit consent is needed for the transfer abroad].',
          'I have been informed that my personal data will not be shared with third parties for their own advertising or marketing.',
          'I give this statement by ticking the consent box on the sign-up form and then clicking the link in the confirmation email.',
        ],
      },
      {
        heading: 'Information',
        blocks: [
          'I have been informed that I can withdraw my explicit consent at any time, without giving a reason, by using the unsubscribe link in every email or by writing to contact@amdnsri.com, and that withdrawing it does not affect processing carried out before.',
        ],
      },
    ],
  },

  AR: {
    draft: 'مسودة: بانتظار مراجعة محامٍ، وغير سارية. ما بين [معقوفين] يجب التحقق منه قبل النشر.',
    title: 'بيان الموافقة الصريحة على النشرة البريدية لدى AMD NSRI',
    status: 'مسودة أُعدّت في أكتوبر 2026، وهي غير سارية بعد. النص المعتمد هو النص التركي، أما النصّان الإنجليزي والعربي فترجمتان [يؤكّده المحامي].',
    intro: [
      'في إطار قانون حماية البيانات الشخصية رقم 6698، نحتاج في AMD NSRI إلى موافقتك الصريحة لكي نتمكن من معالجة بياناتك الشخصية بغرض إرسال نشرة بريدية إليك حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية.',
    ],
    sections: [
      {
        heading: 'ما البيانات الشخصية التي نطلب موافقتك الصريحة عليها؟',
        blocks: [
          'نطلب موافقتك الصريحة على بياناتك الشخصية ضمن فئتي الاتصال (عنوان بريدك الإلكتروني) والهوية (اسمك إن اخترت إدخاله) التي نجمعها منك عبر نموذج الاشتراك في النشرة على موقعنا.',
          'أما السجلات المحفوظة لإثبات موافقتك (وقت الموافقة، وإصدار نص الموافقة، والصفحة التي اشتركت منها) فتُعالَج استناداً إلى الأسس القانونية الأخرى المبيّنة في [[إشعار الخصوصية لدى AMD NSRI|/privacy]] [يؤكّده المحامي].',
        ],
      },
      {
        heading: 'البيان والموافقة',
        blocks: [
          'أقرّ وأُعلن أنني أوافق صراحةً على أن يستخدم المسؤول عن البيانات بياناتي الشخصية، وفقاً للقانون رقم 6698 والتشريعات الأخرى ذات الصلة، وفي حدود الطرق والأغراض والأسس القانونية المبيّنة في [[إشعار الخصوصية لدى AMD NSRI|/privacy]]، لإرسال نشرة بريدية إليّ حول المشاريع الجديدة ومقالات المدونة وتحديثات الأدوات الرقمية، وعلى نقلها لهذا الغرض إلى مزوّدي الخدمات المذكورين في إشعار الخصوصية [يؤكّده المحامي: مدى لزوم موافقة صريحة مستقلة للنقل إلى الخارج].',
          'وقد أُعلمت بأن بياناتي الشخصية لن تُشارَك مع أطراف ثالثة لأغراض الإعلان أو التسويق الخاصة بها.',
          'وأقدّم هذا البيان بوضع علامة في مربع الموافقة في نموذج الاشتراك، ثم بالنقر على الرابط في رسالة التأكيد.',
        ],
      },
      {
        heading: 'الإعلام',
        blocks: [
          'أُعلمت بأنني أستطيع سحب موافقتي الصريحة في أي وقت ودون إبداء أسباب، باستخدام رابط إلغاء الاشتراك الموجود في كل رسالة أو بمراسلة contact@amdnsri.com، وبأن سحبها لا يؤثر في المعالجة التي جرت قبل ذلك.',
        ],
      },
    ],
  },
};
