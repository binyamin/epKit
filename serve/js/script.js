var book = ePub("/book/OEBPS/content.opf");
var rendition = book.renderTo("viewer", {width: "100%", height: "100%", spread: 'always', minSpreadWidth: "600"});
var displayed = rendition.display();

book.ready.then(() => {
    document.getElementById('ctrlPrev').addEventListener('click', () => rendition.prev())
    document.getElementById('ctrlNext').addEventListener('click', () => rendition.next())
    
    document.getElementById('bookTitle').innerText = book.package.metadata.title;

    document.addEventListener('keyup', ev => {
        if(ev.key === 'ArrowLeft') rendition.prev();
        else if(ev.key === 'ArrowRight') rendition.next();
    })
})