const filters = {
    abs: val => Math.abs(val),
    add: (val, arg) => val + arg,
    append: (val, arg) => {
        if (Array.isArray(val)) {
            val.push(arg);
        }
        return val;
    },
    bool: val => Boolean(val),
    capitalize: val => val.charAt(0).toUpperCase() + val.slice(1),
    center: (val, width) => {
        const len = val.length;
        const pad = Math.max(width - len, 0);
        const left = Math.floor(pad / 2);
        const right = pad - left;
        return ' '.repeat(left) + val + ' '.repeat(right);
    },
    clear: val => Array.isArray(val) ? [] : val,
    copy: val => JSON.parse(JSON.stringify(val)),
    count: (val, arg) => Array.isArray(val) ? val.filter(x => x === arg).length : 0,
    cut: (val, substr) => val.split(substr).join(''),
    default: (val, def) => (val == null || val === '') ? def : val,
    difference: (val, other) => val.filter(x => !other.includes(x)),
    divide: (val, arg) => val / arg,
    divisible: (val, arg) => val % arg === 0,
    escape_html: val => val.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c])),
    extend: (val, arr) => {
        if (Array.isArray(val) && Array.isArray(arr)) {
            val.push(...arr);
        }
        return val;
    },
    first: val => Array.isArray(val) ? val[0] : val,
    float: val => parseFloat(val),
    index: (val, arg) => Array.isArray(val) ? val.indexOf(arg) : -1,
    insert: (val, index, item) => Array.isArray(val) ? [...val.slice(0, index), item, ...val.slice(index)] : val,
    int: val => parseInt(val),
    join: (val, arg) => Array.isArray(val) ? val.join(arg) : val,
    last: val => Array.isArray(val) ? val[val.length - 1] : val,
    length: val => val.length,
    list: val => Array.isArray(val) ? val : [val],
    log: val => Math.log(val),
    lower: val => val.toLowerCase(),
    md5: val => crypto.subtle.digest("MD5", new TextEncoder().encode(val)).then(buf => Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')),
    multiply: (val, arg) => val * arg,
    namespace: () => '[Not implemented]',
    pop: val => Array.isArray(val) ? (val.pop(), val) : val,
    put: () => '[Not implemented]',
    random: val => Array.isArray(val) ? val[Math.floor(Math.random() * val.length)] : val,
    range: (start, end) => Array.from({ length: end - start }, (_, i) => start + i),
    replace: (val, from, to) => val.split(from).join(to),
    reverse: val => Array.isArray(val) ? val.reverse() : val.split('').reverse().join(''),
    round: val => Math.round(val),
    safe: val => val,
    select: (val, prop) => val.map(v => v[prop]),
    shuffle: val => Array.isArray(val) ? val.sort(() => Math.random() - 0.5) : val,
    slice: (val, start, end) => val.slice(start, end),
    sort: val => Array.isArray(val) ? val.sort() : val,
    split: (val, arg) => val.split(arg),
    string: val => String(val),
    striptags: val => val.replace(/<[^>]*>?/gm, ''),
    sum: val => Array.isArray(val) ? val.reduce((a, b) => a + b, 0) : val,
    super: () => '[Not implemented]',
    title: val => val.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    tojson: val => JSON.stringify(val),
    today: () => new Date().toISOString().split('T')[0],
    trim: val => val.trim(),
    truncate: (val, len) => val.length > len ? val.slice(0, len) + '...' : val,
    type: val => Array.isArray(val) ? 'array' : typeof val,
    unique: val => Array.from(new Set(val)),
    unixtimestamp: () => Math.floor(Date.now() / 1000),
    upper: val => val.toUpperCase(),
    urlencode: val => encodeURIComponent(val),
    urldecode: val => decodeURIComponent(val),
    wordcount: val => val.trim().split(/\s+/).length,
    wordwrap: (val, width = 80) => val.replace(new RegExp(`(.{1,${width}})( +|$)`, 'g'), '$1\n'),

    // Stubbed complex filters
    attr: () => '[Not implemented]',
    batch: () => '[Not implemented]',
    between_times: () => '[Not implemented]',
    convert_rgb: () => '[Not implemented]',
    dictsort: () => '[Not implemented]',
    escape_attr: () => '[Not implemented]',
    escape_js: () => '[Not implemented]',
    escape_url: () => '[Not implemented]',
    escapejson: () => '[Not implemented]',
    filesizeformat: () => '[Not implemented]',
    forceescape: () => '[Not implemented]',
    format: () => '[Not implemented]',
    format_currency_value: () => '[Not implemented]',
    format_date: () => '[Not implemented]',
    format_datetime: () => '[Not implemented]',
    geo_distance: () => '[Not implemented]',
    groupby: () => '[Not implemented]',
    indent: () => '[Not implemented]',
    intersect: () => '[Not implemented]',
    ipaddr: () => '[Not implemented]',
    map: () => '[Not implemented]',
    minus_time: () => '[Not implemented]',
    plus_time: () => '[Not implemented]',
    pprint: () => '[Not implemented]',
    regex_replace: () => '[Not implemented]',
    reject: () => '[Not implemented]',
    rejectattr: () => '[Not implemented]',
    render: () => '[Not implemented]',
    root: () => '[Not implemented]',
    sanitize_html: () => '[Not implemented]',
    selectattr: () => '[Not implemented]',
    strtodate: () => '[Not implemented]',
    strtotime: () => '[Not implemented]',
    symmetric_difference: () => '[Not implemented]',
    truncatehtml: () => '[Not implemented]',
    unescape_html: () => '[Not implemented]',
    union: () => '[Not implemented]',
    urlize: () => '[Not implemented]',
    xmlattr: () => '[Not implemented]'
};




const variables = {};

function parseArgs(str) {
    const args = [];
    const re = /(".*?"|'.*?'|[^,]+)(?=,|$)/g;
    let match;
    while ((match = re.exec(str)) !== null) {
        let arg = match[0].trim();
        if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
            args.push(arg.slice(1, -1));
        } else {
            try {
                args.push(JSON.parse(arg));
            } catch {
                args.push(arg);
            }
        }
    }
    return args;
}

function resolveValue(path) {
    const parts = path.split('.');
    let val = variables;
    for (const part of parts) {
        if (val && Object.prototype.hasOwnProperty.call(val, part)) {
            val = val[part];
        } else {
            throw new Error(`Unknown variable or property: ${part}`);
        }
    }
    return val;
}

function runHubL() {
    const input = document.getElementById("hublInput").value;
    let output = input;

    // Process {% set ... %}
    const setRe = /{\%\s*set\s+(\w+)\s*=\s*(.*?)\s*\%}/g;
    output = output.replace(setRe, (_, varName, rawVal) => {
        let val = rawVal.trim();
        try {
            variables[varName] = JSON.parse(val);
        } catch {
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            variables[varName] = val;
        }
        return '';
    });

    // Process {% if ... %}{% else %}{% endif %}
    const ifRe = /{\%\s*if\s+(.*?)\s*\%}([\s\S]*?)(?:{\%\s*else\s*\%}([\s\S]*?))?{\%\s*endif\s*\%}/g;
    output = output.replace(ifRe, (_, condition, truthy, falsy) => {
        try {
            const val = resolveValue(condition.trim());
            return val ? truthy : (falsy || '');
        } catch {
            return falsy || '';
        }
    });

    // Process {% for var in array %}{% endfor %}
    const forRe = /{\%\s*for\s+(\w+)\s+in\s+(\w+)\s*\%}([\s\S]*?){\%\s*endfor\s*\%}/g;
    output = output.replace(forRe, (_, varName, arrName, block) => {
        const arr = variables[arrName];
        if (!Array.isArray(arr)) return '';
        return arr.map(item => {
            variables[varName] = item;
            return block;
        }).join('');
    });

    // Process {{ ... }}
    const exprRe = /{{\s*(.*?)\s*}}/g;
    output = output.replace(exprRe, (_, expression) => {
        let [valueRaw, ...rest] = expression.split('|').map(s => s.trim());

        let value;
        try {
            value = resolveValue(valueRaw);
        } catch {
            try {
                value = JSON.parse(valueRaw);
            } catch {
                return `[Error: Invalid value '${valueRaw}']`;
            }
        }

        for (let part of rest) {
            const fnMatch = part.match(/^(\w+)(?:\((.*?)\))?$/);
            if (!fnMatch) return `[Error] Invalid filter: ${part}`;

            const [, name, argsRaw] = fnMatch;
            const args = argsRaw ? parseArgs(argsRaw) : [];

            const fn = filters[name];
            if (!fn) return `[Error] Unknown filter: ${name}`;

            try {
                const result = fn(value, ...args);
                if (result instanceof Promise) return '[Error] Async filters not supported inline';
                value = result;
            } catch (err) {
                return `[Error] Filter failed: ${err.message}`;
            }
        }

        return value;
    });

    display(output);
}

function display(output) {
    document.getElementById("output").textContent = `→ ${output}`;
}
