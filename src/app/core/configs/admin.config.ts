export const AdminConfig: { [name: string]: any } = {
  locale: 'en-US',
  // timeZone: 'America/Chicago',
  timeZone: 'local',
  format: {
    date: 'MM/DD/YYYY',
    dayMonth: 'MMM DD',
    dateTime: 'MM/DD/YYYY HH:mm',
    fullDateTime: 'MM/DD/YYYY HH:mm:ss',
    dateTimeAM: 'MM/DD/YYYY hh:mm A',
    apiDate: 'YYYY/MM/DD',
    apiDateTime: 'YYYY-MM-DD[T]HH:mm:ssZ',
    apiDateTimeNoZ: 'YYYY-MM-DD[T]HH:mm:ss',
    apiDateMonthYear: 'MMM DD YYYY',
    urlParam: 'YYYY-MM-DD'
  },
  mask: {
    phone: '(000) 000-0000',
    date: 'M0/d0/0000',
    zipCode: '00000',
    money: '0*.00',
    number: '0*.00',
    integer: '0*',
    tax: '00.0000',
    sku: '0000000000000',
    pin: '000000'
  },
  regex: {
    password: '^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}',
    url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    shortCode: '^[A-Z0-9_]{1,20}$',
    email: /^[a-zA-Z0-9][a-zA-Z0-9_\.]*@[a-z0-9-]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
    leadTimeKeyPress: /^[0-9mhdw ]+$/,
    leadTime: [
      /^(?:(?<minutes>\d{0,2})m\s*)?(?:(?<hours>\d{0,3})h\s*)?(?:(?<days>\d{0,2})d\s*)?(?:(?<weeks>\d{0,2})w\s*)?$/,
      /^(?:(?<weeks>\d{0,2})w\s*)?(?:(?<days>\d{0,2})d\s*)?(?:(?<hours>\d{0,3})h\s*)?(?:(?<minutes>\d{0,2})m\s*)?$/,
    ],
    userPIN: /^[0-9]{6}$/,
    storeCode: /^[0-9]{1,10}$/,
  },
  pattern: {

  },
  pipe: {

  },
  pageSizeOptions: [5, 10, 25, 50, 100],

  maxOrderNumber: 99999,

  // TinyMCE
  tinyHeightDefault: '50vh',
  tinyMCEPluginConfig: 'print preview fullpage importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  tinyMCEToolbarConfig: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | fileManagerButton | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | forecolor backcolor | pagebreak | charmap emoticons | fullscreen  preview save print | image media template link anchor codesample | ltr rtl',

  // Resize image
  resizeImageServiceUrl: 'https://sandboxunitedapi.relationshop.net/V6/Asset/api/File/get-resized-image',
};
