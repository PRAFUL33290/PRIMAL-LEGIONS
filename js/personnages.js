/**
 * PRIMAL LEGIONS - Characters Page JavaScript
 * Map interactions and character filtering
 */

document.addEventListener('DOMContentLoaded', () => {
    // Character data
    const charactersData = {
        lion: {
            emoji: '&#129409;',
            name: 'Lion',
            title: 'Le Gardien de la Canopée',
            location: 'Amazonie, Brésil'
        },
        tigresse: {
            emoji: '&#128047;',
            name: 'Tigresse',
            title: 'La Traqueuse des Lianes',
            location: 'Amazonie, Pérou'
        },
        ours: {
            emoji: '&#128059;',
            name: 'Ours',
            title: 'Le Colosse des Andes',
            location: 'Andes, Colombie'
        },
        panthere: {
            emoji: '&#128006;',
            name: 'Panthère',
            title: "L'Ombre du Pantanal",
            location: 'Pantanal, Brésil'
        },
        requin: {
            emoji: '&#129416;',
            name: 'Requin',
            title: 'Le Faucheur des Profondeurs',
            location: 'Pacifique, Chili'
        },
        raie: {
            emoji: '&#127754;',
            name: 'Raie Manta',
            title: 'La Veilleuse des Courants',
            location: 'Galápagos, Équateur'
        },
        loup: {
            emoji: '&#128058;',
            name: 'Loup',
            title: 'Le Chef des Vents du Sud',
            location: 'Patagonie, Argentine'
        },
        renarde: {
            emoji: '&#129418;',
            name: 'Renarde',
            title: 'La Rusée des Pampas',
            location: 'Pampas, Uruguay'
        },
        aigle: {
            emoji: '&#129413;',
            name: 'Aigle',
            title: 'Le Messager des Sommets',
            location: 'Andes, Pérou'
        },
        hibou: {
            emoji: '&#129417;',
            name: 'Hibou',
            title: 'La Gardienne Nocturne',
            location: 'Hauts plateaux, Bolivie'
        },
        crocodile: {
            emoji: '&#128010;',
            name: 'Crocodile',
            title: 'Le Tyran des Marécages',
            location: 'Llanos, Venezuela'
        },
        serpent: {
            emoji: '&#128013;',
            name: 'Serpent',
            title: "L'Enchanteresse des Racines",
            location: 'Amazonie, Colombie'
        },
        taureau: {
            emoji: '&#128002;',
            name: 'Taureau',
            title: 'Le Briseur des Plaines',
            location: 'Pampas, Argentine'
        },
        biche: {
            emoji: '&#129420;',
            name: 'Biche',
            title: "L'Esprit Sylvestre",
            location: 'Forêts du Sud, Chili'
        },
        scorpion: {
            emoji: '&#129410;',
            name: 'Scorpion',
            title: 'Le Fléau des Sables Rouges',
            location: 'Atacama, Pérou/Chili'
        },
        araignee: {
            emoji: '&#128375;',
            name: 'Araignée',
            title: "La Tisseuse d'Ombres",
            location: 'Amazonie, Brésil'
        },
        gorille: {
            emoji: '&#129421;',
            name: 'Gorille',
            title: 'Le Pilier de la Jungle',
            location: 'Guyane française'
        },
        guepard: {
            emoji: '&#128006;',
            name: 'Guépard',
            title: "L'Éclair du Chaco",
            location: 'Gran Chaco, Paraguay'
        },
        poulpe: {
            emoji: '&#128025;',
            name: 'Poulpe',
            title: 'Le Stratège Abyssal',
            location: 'Côte pacifique, Pérou'
        },
        meduse: {
            emoji: '&#127756;',
            name: 'Méduse',
            title: 'La Lumière Engloutie',
            location: 'Atlantique, Brésil'
        }
    };

    // Map marker interactions
    const markers = document.querySelectorAll('.marker');
    const infoPanel = document.getElementById('mapInfoPanel');

    markers.forEach(marker => {
        marker.addEventListener('mouseenter', (e) => {
            const characterKey = marker.dataset.character;
            const data = charactersData[characterKey];

            if (data && infoPanel) {
                infoPanel.querySelector('.info-emoji').innerHTML = data.emoji;
                infoPanel.querySelector('.info-name').textContent = data.name;
                infoPanel.querySelector('.info-title').textContent = data.title;
                infoPanel.querySelector('.info-location').innerHTML = `<span>&#128205;</span> ${data.location}`;
                infoPanel.classList.add('active');
            }
        });

        marker.addEventListener('mouseleave', () => {
            if (infoPanel) {
                infoPanel.classList.remove('active');
            }
        });

        // Click to scroll to character card
        marker.addEventListener('click', () => {
            const characterKey = marker.dataset.character;
            const card = document.querySelector(`.character-card[data-character="${characterKey}"]`);
            if (card) {
                // Reset filter to show all
                filterCharacters('all');
                document.querySelectorAll('.filter-tab').forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.filter === 'all') {
                        tab.classList.add('active');
                    }
                });

                // Scroll to card
                setTimeout(() => {
                    const headerOffset = 100;
                    const elementPosition = card.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Highlight card
                    card.style.transform = 'scale(1.05)';
                    card.style.boxShadow = '0 0 40px rgba(201, 162, 39, 0.6)';
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    }, 1500);
                }, 100);
            }
        });
    });

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const characterCards = document.querySelectorAll('.character-card');

    function filterCharacters(faction) {
        characterCards.forEach((card, index) => {
            const cardFaction = card.dataset.faction;

            if (faction === 'all' || cardFaction === faction) {
                card.classList.remove('hidden');
                card.style.animationDelay = `${index * 0.05}s`;
            } else {
                card.classList.add('hidden');
            }
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter characters
            const filter = tab.dataset.filter;
            filterCharacters(filter);
        });
    });

    // Character card hover effect - highlight on map
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const characterKey = card.dataset.character;
            const marker = document.querySelector(`.marker[data-character="${characterKey}"]`);
            if (marker) {
                marker.style.transform = 'scale(2)';
                marker.querySelector('circle:first-child').style.filter = 'url(#glow) drop-shadow(0 0 10px gold)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const characterKey = card.dataset.character;
            const marker = document.querySelector(`.marker[data-character="${characterKey}"]`);
            if (marker) {
                marker.style.transform = '';
                marker.querySelector('circle:first-child').style.filter = 'url(#glow)';
            }
        });
    });

    // Intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    characterCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
});
