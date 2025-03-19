function mostrarTexto() {
    const inputElement = document.getElementById("inputText") ;
    const outputSection = document.getElementById("output");
    
    if (inputElement && outputSection) {
        const texto = inputElement.value;
        outputSection.textContent = texto;
        outputSection.style.backgroundColor = '#d3d3d3';
        outputSection.style.color = '#000';
        outputSection.style.fontSize = '16px';
        outputSection.style.textAlign = 'justify';
    }

}