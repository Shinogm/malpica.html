document.addEventListener('DOMContentLoaded', () => {
    // --- Definición de Códigos de Colores ---
    const colorCodes = {
        ninguno: { value: null, multiplier: null, tolerance: 20, tempCoeff: null, color: '#eee' }, // Para 3/4 bandas sin tolerancia explícita
        negro:   { value: 0, multiplier: 1,    tolerance: null, tempCoeff: 250, color: '#000000' },
        marron:  { value: 1, multiplier: 10,   tolerance: 1,    tempCoeff: 100, color: '#a52a2a' },
        rojo:    { value: 2, multiplier: 100,  tolerance: 2,    tempCoeff: 50,  color: '#ff0000' },
        naranja: { value: 3, multiplier: 1000, tolerance: null, tempCoeff: 15,  color: '#ffa500' },
        amarillo:{ value: 4, multiplier: 10000,tolerance: null, tempCoeff: 25,  color: '#ffff00' },
        verde:   { value: 5, multiplier: 100000,tolerance: 0.5, tempCoeff: 20,  color: '#008000' },
        azul:    { value: 6, multiplier: 1000000,tolerance: 0.25,tempCoeff: 10,  color: '#0000ff' },
        violeta: { value: 7, multiplier: 10000000,tolerance: 0.1,tempCoeff: 5,   color: '#ee82ee' },
        gris:    { value: 8, multiplier: 100000000,tolerance: 0.05,tempCoeff: 1, color: '#808080' },
        blanco:  { value: 9, multiplier: 1000000000,tolerance: null,tempCoeff: null, color: '#ffffff' },
        oro:     { value: null, multiplier: 0.1,  tolerance: 5,    tempCoeff: null, color: '#ffd700' },
        plata:   { value: null, multiplier: 0.01, tolerance: 10,   tempCoeff: null, color: '#c0c0c0' }
    };

    // --- Selectores del DOM ---
    const bandCountSelect = document.getElementById('band-count');
    const bandSelectors = {
        band1: document.getElementById('band1'),
        band2: document.getElementById('band2'),
        band3: document.getElementById('band3'),
        multiplier: document.getElementById('multiplier'),
        tolerance: document.getElementById('tolerance'),
        tempcoeff: document.getElementById('tempcoeff')
    };
    const bandSelectorDivs = {
        band1: document.getElementById('band1-selector'),
        band2: document.getElementById('band2-selector'),
        band3: document.getElementById('band3-selector'),
        multiplier: document.getElementById('multiplier-selector'),
        tolerance: document.getElementById('tolerance-selector'),
        tempcoeff: document.getElementById('tempcoeff-selector')
    };
     const colorPreviews = {
        band1: document.getElementById('preview1'),
        band2: document.getElementById('preview2'),
        band3: document.getElementById('preview3'),
        multiplier: document.getElementById('preview-multiplier'),
        tolerance: document.getElementById('preview-tolerance'),
        tempcoeff: document.getElementById('preview-tempcoeff')
    };
    const bandViz = {
        band1: document.getElementById('viz1'),
        band2: document.getElementById('viz2'),
        band3: document.getElementById('viz3'),
        multiplier: document.getElementById('viz-multiplier'),
        tolerance: document.getElementById('viz-tolerance'),
        tempcoeff: document.getElementById('viz-tempcoeff')
    };

    const resistanceValueP = document.getElementById('resistance-value');
    const toleranceValueP = document.getElementById('tolerance-value');
    const tempcoeffValueP = document.getElementById('tempcoeff-value');

    // --- Funciones Auxiliares ---

    // Popula un dropdown con opciones de color válidas para ese tipo de banda
    function populateSelect(selectElement, validColors) {
        selectElement.innerHTML = ''; // Limpiar opciones existentes
        validColors.forEach(colorName => {
            if (colorCodes[colorName]) {
                const option = document.createElement('option');
                option.value = colorName;
                option.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1); // Capitalizar
                selectElement.appendChild(option);
            }
        });
    }

    // Formatea el valor de resistencia (e.g., 1000 -> 1 kΩ)
    function formatResistance(value) {
        if (value >= 1e9) return (value / 1e9).toFixed(2).replace(/\.?0+$/, '') + ' GΩ';
        if (value >= 1e6) return (value / 1e6).toFixed(2).replace(/\.?0+$/, '') + ' MΩ';
        if (value >= 1e3) return (value / 1e3).toFixed(2).replace(/\.?0+$/, '') + ' kΩ';
        return value.toFixed(2).replace(/\.?0+$/, '') + ' Ω';
    }

    // Actualiza la visibilidad de los selectores de banda
    function updateBandVisibility() {
        const bandCount = parseInt(bandCountSelect.value);

        bandSelectorDivs.band1.style.display = 'flex'; // Siempre visible
        bandSelectorDivs.band2.style.display = 'flex'; // Siempre visible
        bandSelectorDivs.multiplier.style.display = 'flex'; // Siempre visible
        bandSelectorDivs.tolerance.style.display = 'flex'; // Visible para 4, 5, 6

        bandSelectorDivs.band3.style.display = (bandCount >= 5) ? 'flex' : 'none';
        bandSelectorDivs.tempcoeff.style.display = (bandCount === 6) ? 'flex' : 'none';
        tempcoeffValueP.style.display = (bandCount === 6) ? 'block' : 'none';

        // Ajustar visibilidad de bandas en la visualización
        bandViz.band3.style.display = (bandCount >= 5) ? 'inline-block' : 'none';
        bandViz.tempcoeff.style.display = (bandCount === 6) ? 'inline-block' : 'none';
        // La banda de tolerancia siempre está (implícita o explícita) para 4+
        bandViz.tolerance.style.display = (bandCount >= 4) ? 'inline-block' : 'none';


        populateOptions(); // Repopular con las opciones correctas
        calculateResistance(); // Recalcular al cambiar número de bandas
    }

    // Popula todos los selectores según el número de bandas
    function populateOptions() {
        const bandCount = parseInt(bandCountSelect.value);

        // Colores válidos para cada banda (según la tabla estándar)
        const digitColors = ['negro', 'marron', 'rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'gris', 'blanco'];
        const multiplierColors = ['negro', 'marron', 'rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'gris', 'blanco', 'oro', 'plata'];
        let toleranceColors = ['marron', 'rojo', 'verde', 'azul', 'violeta', 'gris', 'oro', 'plata'];
        const tempCoeffColors = ['negro', 'marron', 'rojo', 'naranja', 'amarillo', 'verde', 'azul', 'violeta', 'gris'];

         // Para 4 bandas, si no hay banda de tolerancia explícita, se asume 20% (ninguno)
        if (bandCount === 4) {
           // La banda 4 ES la tolerancia en 4 bandas
           toleranceColors = ['marron', 'rojo', 'verde', 'azul', 'violeta', 'gris', 'oro', 'plata', 'ninguno'];
        } else if (bandCount >= 5) {
            toleranceColors = ['marron', 'rojo', 'verde', 'azul', 'violeta', 'gris', 'oro', 'plata']; // No 'ninguno' para 5/6
        }

        populateSelect(bandSelectors.band1, digitColors.filter(c => c !== 'negro')); // Banda 1 no puede ser negro
        populateSelect(bandSelectors.band2, digitColors);
        if (bandCount >= 5) populateSelect(bandSelectors.band3, digitColors);
        populateSelect(bandSelectors.multiplier, multiplierColors);
        populateSelect(bandSelectors.tolerance, toleranceColors);
        if (bandCount === 6) populateSelect(bandSelectors.tempcoeff, tempCoeffColors);

        // Seleccionar valores por defecto razonables (opcional)
        bandSelectors.band1.value = bandSelectors.band1.options[1]?.value || bandSelectors.band1.options[0]?.value; // Marrón o el primero
        bandSelectors.band2.value = bandSelectors.band2.options[0]?.value; // Negro
        if (bandCount >= 5) bandSelectors.band3.value = bandSelectors.band3.options[0]?.value; // Negro
        bandSelectors.multiplier.value = bandSelectors.multiplier.options[1]?.value || bandSelectors.multiplier.options[0]?.value; // Marrón o el primero
        bandSelectors.tolerance.value = bandSelectors.tolerance.options.namedItem('oro')?.value || bandSelectors.tolerance.options[0]?.value; // Oro o el primero
        if (bandCount === 6) bandSelectors.tempcoeff.value = bandSelectors.tempcoeff.options[1]?.value || bandSelectors.tempcoeff.options[0]?.value; // Marrón o el primero
    }

     // Actualiza el color de fondo de la vista previa y la banda visual
    function updateColorVisuals(bandKey, colorName) {
        const colorData = colorCodes[colorName];
        const colorHex = colorData ? colorData.color : '#eee'; // Color por defecto si algo falla

        if (colorPreviews[bandKey]) {
            colorPreviews[bandKey].style.backgroundColor = colorHex;
            colorPreviews[bandKey].style.border = (colorHex === '#ffffff') ? '1px solid #ccc' : 'none'; // Borde para blanco
        }
         if (bandViz[bandKey]) {
            bandViz[bandKey].style.backgroundColor = colorHex;
            bandViz[bandKey].style.border = (colorHex === '#ffffff') ? '1px solid #ccc' : 'none';
        }
    }


    // --- Cálculo Principal ---
    function calculateResistance() {
        const bandCount = parseInt(bandCountSelect.value);
        const color1 = bandSelectors.band1.value;
        const color2 = bandSelectors.band2.value;
        const color3 = (bandCount >= 5) ? bandSelectors.band3.value : null;
        const multiplierColor = bandSelectors.multiplier.value;
        const toleranceColor = bandSelectors.tolerance.value;
        const tempCoeffColor = (bandCount === 6) ? bandSelectors.tempcoeff.value : null;

        // Actualizar colores visuales
        updateColorVisuals('band1', color1);
        updateColorVisuals('band2', color2);
        if (color3) updateColorVisuals('band3', color3); else if(bandViz.band3) bandViz.band3.style.backgroundColor = 'transparent';
        updateColorVisuals('multiplier', multiplierColor);
        updateColorVisuals('tolerance', toleranceColor);
        if (tempCoeffColor) updateColorVisuals('tempcoeff', tempCoeffColor); else if (bandViz.tempcoeff) bandViz.tempcoeff.style.backgroundColor = 'transparent';


        // Validar que los colores existan
        if (!colorCodes[color1] || !colorCodes[color2] || (color3 && !colorCodes[color3]) || !colorCodes[multiplierColor] || !colorCodes[toleranceColor] || (tempCoeffColor && !colorCodes[tempCoeffColor])) {
            resistanceValueP.textContent = 'Valor: Error en selección';
            toleranceValueP.textContent = 'Tolerancia: -';
            tempcoeffValueP.textContent = 'Coef. Temperatura: -';
            return;
        }

        let baseValue;
        const val1 = colorCodes[color1].value;
        const val2 = colorCodes[color2].value;

        if (bandCount >= 5) {
            const val3 = colorCodes[color3].value;
            if (val1 === null || val2 === null || val3 === null) { /* Error */ return; }
            baseValue = val1 * 100 + val2 * 10 + val3;
        } else { // 4 bandas (o 3 implícitamente)
             if (val1 === null || val2 === null) { /* Error */ return; }
            baseValue = val1 * 10 + val2;
        }

        const multiplier = colorCodes[multiplierColor].multiplier;
        if (multiplier === null) { /* Error */ return; }

        const finalResistance = baseValue * multiplier;

        // Tolerancia
        const tolerance = colorCodes[toleranceColor].tolerance;
        const toleranceStr = (tolerance !== null) ? `±${tolerance}%` : '±20%'; // Asume 20% si 'ninguno' o null

        // Coeficiente de Temperatura
        let tempCoeffStr = '-';
        if (bandCount === 6 && tempCoeffColor) {
            const tempCoeff = colorCodes[tempCoeffColor].tempCoeff;
            if (tempCoeff !== null) {
                tempCoeffStr = `${tempCoeff} ppm/K`;
            }
        }

        // Mostrar resultados
        resistanceValueP.textContent = `Valor: ${formatResistance(finalResistance)}`;
        toleranceValueP.textContent = `Tolerancia: ${toleranceStr}`;
        if (bandCount === 6) {
            tempcoeffValueP.textContent = `Coef. Temperatura: ${tempCoeffStr}`;
        }
    }

    // --- Event Listeners ---
    bandCountSelect.addEventListener('change', updateBandVisibility);

    // Añadir listeners a todos los selectores de color
    Object.values(bandSelectors).forEach(select => {
        if(select) { // Asegurarse que el elemento existe
           select.addEventListener('change', calculateResistance);
        }
    });

    // --- Inicialización ---
    updateBandVisibility(); // Configurar visibilidad inicial y popular opciones
    calculateResistance(); // Calcular valor inicial

});