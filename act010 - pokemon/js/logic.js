const typePokemon = [
    {
        type: "dragon",
        icon: '🔥'
    },
    {
        type: "agua",
        icon: '💧'
    },
    {
        type: "veneno",
        icon: '🌿'
    },
    {
        type: "electric",
        icon: '⚡'
    },
];

const cardPokemon = [
    {
        name: "Charizard",
        type: "dragon",
        atq: 84,
        def: 78,
        speed: 100,
        tall: 1.7,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"
    },
    {
        name: "Blastoise",
        type: "agua",
        atq: 83,
        def: 100,
        speed: 78,
        tall: 1.6,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png"
    },
    {
        name: "Venusaur",
        type: "veneno",
        atq: 82,
        def: 83,
        speed: 80,
        tall: 2.0,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
    },
    {
        name: "Pikachu",
        type: "electric",
        atq: 55,
        def: 40,
        speed: 90,
        tall: 0.4,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    },
    // Dragon type additions
    {
        name: "Dragonite",
        type: "dragon",
        atq: 134,
        def: 95,
        speed: 80,
        tall: 2.2,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png"
    },
    {
        name: "Arcanine",
        type: "dragon",
        atq: 110,
        def: 80,
        speed: 95,
        tall: 1.9,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png"
    },
    {
        name: "Moltres",
        type: "dragon",
        atq: 100,
        def: 90,
        speed: 90,
        tall: 2.0,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png"
    },
    {
        name: "Typhlosion",
        type: "dragon",
        atq: 109,
        def: 85,
        speed: 100,
        tall: 1.7,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/157.png"
    },
    // Agua type additions
    {
        name: "Gyarados",
        type: "agua",
        atq: 125,
        def: 79,
        speed: 81,
        tall: 6.5,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png"
    },
    {
        name: "Vaporeon",
        type: "agua",
        atq: 65,
        def: 60,
        speed: 65,
        tall: 1.0,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png"
    },
    {
        name: "Feraligatr",
        type: "agua",
        atq: 105,
        def: 100,
        speed: 78,
        tall: 2.3,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/160.png"
    },
    {
        name: "Lapras",
        type: "agua",
        atq: 85,
        def: 80,
        speed: 60,
        tall: 2.5,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png"
    },
    // Veneno type additions
    {
        name: "Gengar",
        type: "veneno",
        atq: 65,
        def: 60,
        speed: 110,
        tall: 1.5,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png"
    },
    {
        name: "Muk",
        type: "veneno",
        atq: 105,
        def: 75,
        speed: 50,
        tall: 1.2,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/089.png"
    },
    {
        name: "Vileplume",
        type: "veneno",
        atq: 80,
        def: 85,
        speed: 50,
        tall: 1.2,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/045.png"
    },
    {
        name: "Nidoking",
        type: "veneno",
        atq: 102,
        def: 77,
        speed: 85,
        tall: 1.4,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/034.png"
    },
    // Electric type additions
    {
        name: "Jolteon",
        type: "electric",
        atq: 65,
        def: 60,
        speed: 130,
        tall: 0.8,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png"
    },
    {
        name: "Electabuzz",
        type: "electric",
        atq: 83,
        def: 57,
        speed: 105,
        tall: 1.1,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/125.png"
    },
    {
        name: "Raichu",
        type: "electric",
        atq: 90,
        def: 55,
        speed: 110,
        tall: 0.8,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png"
    },
    {
        name: "Zapdos",
        type: "electric",
        atq: 90,
        def: 85,
        speed: 100,
        tall: 1.6,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png"
    },
    {
        name: "Ampharos",
        type: "electric",
        atq: 75,
        def: 85,
        speed: 55,
        tall: 1.4,
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/181.png"
    }
];
document.addEventListener('DOMContentLoaded', function() {
    const pokemonContainer = document.getElementById('pokemon-container');
    
    function getTypeIcon(type) {
        const typeObj = typePokemon.find(item => item.type === type);
        return typeObj ? typeObj.icon : '❓';
    }
    
    cardPokemon.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        
        const cardHeader = document.createElement('div');
        cardHeader.className = `card-header ${pokemon.type}`;
        
        const img = document.createElement('img');
        img.className = 'pokemon-image';
        img.src = pokemon.img;
        img.alt = pokemon.name;
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        const name = document.createElement('h2');
        name.className = 'pokemon-name';
        name.textContent = pokemon.name;
        
        const type = document.createElement('div');
        type.className = 'pokemon-type';
        
        const typeIcon = document.createElement('span');
        typeIcon.className = 'type-icon';
        typeIcon.textContent = getTypeIcon(pokemon.type);
        
        const typeText = document.createElement('span');
        typeText.textContent = pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1);
        
        const stats = document.createElement('div');
        stats.className = 'pokemon-stats';
        stats.style.display = 'none';
        stats.innerHTML = `
            <p><strong>Ataque:</strong> ${pokemon.atq}</p>
            <p><strong>Defensa:</strong> ${pokemon.def}</p>
            <p><strong>Velocidad:</strong> ${pokemon.speed}</p>
            <p><strong>Altura:</strong> ${pokemon.tall}m</p>
        `;
        
        img.addEventListener('click', () => {
            stats.style.display = stats.style.display === 'none' ? 'block' : 'none';
        });
        
        type.appendChild(typeIcon);
        type.appendChild(typeText);
        
        cardBody.appendChild(name);
        cardBody.appendChild(type);
        cardBody.appendChild(stats);
        
        card.appendChild(cardHeader);
        card.appendChild(img);
        card.appendChild(cardBody);
        
        pokemonContainer.appendChild(card);
    });
});
