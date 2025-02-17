import jsdocJson from '../../../doc.json';
const visibleFunctions = jsdocJson.docs
  .filter(({ name, description }) => name && !name.startsWith('_') && !!description)
  .sort((a, b) => /* a.meta.filename.localeCompare(b.meta.filename) +  */ a.name.localeCompare(b.name));

const getInnerText = (html) => {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export function Reference() {
  return (
    <div className="flex h-full w-full pt-2 text-foreground overflow-hidden">
      <div className="w-42 flex-none h-full overflow-y-auto overflow-x-hidden pr-4">
        {visibleFunctions.map((entry, i) => (
          <a
            key={i}
            className="cursor-pointer block hover:bg-lineHighlight py-1 px-4"
            onClick={() => {
              const el = document.getElementById(`doc-${i}`);
              const container = document.getElementById('reference-container');
              container.scrollTo(0, el.offsetTop);
            }}
          >
            {entry.name} {/* <span className="text-gray-600">{entry.meta.filename}</span> */}
          </a>
        ))}
      </div>
      <div className="break-normal w-full h-full overflow-auto pl-4 flex relative" id="reference-container">
        <div className="prose dark:prose-invert max-w-full pr-4">
          <h2>API Reference</h2>
          <p>
            This is the long list functions you can use! Remember that you don't need to remember all of those and that
            you can already make music with a small set of functions!
          </p>
          {visibleFunctions.map((entry, i) => (
            <section key={i}>
              <h3 id={`doc-${i}`}>{entry.name}</h3>
              {/* <small>{entry.meta.filename}</small> */}
              <p dangerouslySetInnerHTML={{ __html: entry.description }}></p>
              <ul>
                {entry.params?.map(({ name, type, description }, i) => (
                  <li key={i}>
                    {name} : {type.names?.join(' | ')} {description ? <> - {getInnerText(description)}</> : ''}
                  </li>
                ))}
              </ul>
              {entry.examples?.map((example, j) => (
                <pre key={j}>{example}</pre>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
