export function useExportReport() {
  const uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,';
  const style = `<style>
            .border {
                border-style: solid;
                border-color:rgb(0, 0, 0);
                border-width: thin;
                border-collapse: collapse;
            }
            .orange { background-color: rgb(255, 165, 0); }
            .mediumaquamarine { background-color: rgb(102, 221, 170); }
          </style>`;
  const template = `
            <html
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40" lang="en">
                <head>
                <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
                ${style}
                <!--[if gte mso 9]>
                  <xml>
                      <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                            <x:ExcelWorksheet>
                                <x:Name>{worksheet}</x:Name>
                                <x:WorksheetOptions>
                                    <x:DoNotDisplayGridlines/>
                                </x:WorksheetOptions>
                            </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                      </x:ExcelWorkbook>
                  </xml>
                <![endif]-->
                </head>
                <body>
                    <table>{table}</table>
                </body>
            </html>`;

  const base64 = (s) => {
    return window.btoa(unescape(encodeURIComponent(s)));
  };

  const format = (s, c) => {
    return s.replace(/{(\w+)}/g, function (_m, p) {
      return c[p];
    });
  };

  const exportXLS = (selector, filename, nameSheet = 'Sheet') => {
    const table = document.querySelector(selector);
    const link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, { worksheet: nameSheet, table: table.innerHTML }));
    link.click();
  };

  return { exportXLS };
}
