let sortDirection = {}; // 存储每个列的排序方向

function sortTable(colIndex) {
    const table = document.getElementById('memeTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // 切换排序方向
    sortDirection[colIndex] = !sortDirection[colIndex];
    const isAscending = sortDirection[colIndex];

    rows.sort((a, b) => {
        let aVal, bVal;
        const aCell = a.cells[colIndex].textContent.trim();
        const bCell = b.cells[colIndex].textContent.trim();

        if (colIndex === 0) { // 排名：数字
            aVal = parseInt(aCell);
            bVal = parseInt(bCell);
        } else if (colIndex === 2) { // 市值：数字（亿美元）
            aVal = parseFloat(aCell);
            bVal = parseFloat(bCell);
        } else if (colIndex === 3) { // 价格：数字
            aVal = parseFloat(aCell);
            bVal = parseFloat(bCell);
        } else if (colIndex === 4) { // 24h变化：数字（忽略%）
            aVal = parseFloat(aCell.replace('%', ''));
            bVal = parseFloat(bCell.replace('%', ''));
        } else { // 名称：字符串
            aVal = aCell.toLowerCase();
            bVal = bCell.toLowerCase();
        }

        if (isNaN(aVal) || isNaN(bVal)) {
            return aVal.localeCompare(bVal);
        }
        return isAscending ? aVal - bVal : bVal - aVal;
    });

    // 重新渲染行，并更新排名列
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1; // 更新排名
        tbody.appendChild(row);
    });

    // 更新表头指示器（颜色变化）
    const headers = table.querySelectorAll('th');
    headers.forEach((th, index) => {
        if (index === colIndex) {
            th.style.backgroundColor = isAscending ? '#27ae60' : '#e74c3c';
        } else {
            th.style.backgroundColor = '#f39c12';
        }
    });
}

// 初始化：默认按市值降序排序
sortDirection[2] = false;
sortTable(2);
