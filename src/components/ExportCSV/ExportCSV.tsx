import { ISelectedItem } from '../../types';

type ExportCSV = {
  data: ISelectedItem[];
  fileName: string;
};

function ExportCSV({ data, fileName }: ExportCSV) {
  const downloadCSV = () => {
    const csvString = [
      ...data.map((item) => [
        `id: ${item.id}`,
        `  Name: ${item.name}`,
        `  URL: ${item.url}`,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button className="download" onClick={downloadCSV}>
      Download
    </button>
  );
}

export default ExportCSV;
