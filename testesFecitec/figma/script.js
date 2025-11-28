// Dados de exemplo para inscrições
const inscricoesData = [
    {
        id: 1,
        aluno: 'João Silva',
        email: 'joao.silva@email.com',
        palestra: 'Inteligência Artificial e Machine Learning',
        horario: '14:00 - 15:30',
        sala: 'Auditório A',
        status: 'confirmada'
    },
    {
        id: 2,
        aluno: 'Maria Santos',
        email: 'maria.santos@email.com',
        palestra: 'Desenvolvimento Web Moderno',
        horario: '10:00 - 11:30',
        sala: 'Sala 201',
        status: 'confirmada'
    },
    {
        id: 3,
        aluno: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        palestra: 'Cloud Computing e DevOps',
        horario: '16:00 - 17:30',
        sala: 'Auditório B',
        status: 'pendente'
    }
];

// Navegação entre views
function showView(viewName) {
    // Esconder todas as views
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
    });
    
    // Mostrar a view selecionada
    const selectedView = document.getElementById('view-' + viewName);
    if (selectedView) {
        selectedView.style.display = 'block';
        selectedView.classList.add('active');
    }
    
    // Atualizar navegação ativa
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600');
        link.classList.add('text-gray-600', 'hover:text-indigo-600');
    });
    
    const activeNavLink = document.getElementById('nav-' + viewName);
    if (activeNavLink) {
        activeNavLink.classList.remove('text-gray-600', 'hover:text-indigo-600');
        activeNavLink.classList.add('text-indigo-600');
    }
    
    // Se for a view de consulta, carregar as inscrições
    if (viewName === 'consulta') {
        renderInscricoes(inscricoesData);
    }
}

// Limpar formulário
function limparFormulario() {
    document.getElementById('form-cadastro').reset();
}

// Função para lidar com o submit do formulário
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-cadastro').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            curso: document.getElementById('curso').value
        };
        
        console.log('Dados do aluno:', formData);
        
        alert('Aluno cadastrado com sucesso!');
        
        limparFormulario();
    });
    
    // Renderizar inscrições iniciais
    renderInscricoes(inscricoesData);
});

// Função para obter a classe de status
function getStatusClass(status) {
    switch (status) {
        case 'confirmada':
            return 'bg-green-100 text-green-700';
        case 'pendente':
            return 'bg-yellow-100 text-yellow-700';
        case 'cancelada':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

// Função para obter o texto do status
function getStatusText(status) {
    switch (status) {
        case 'confirmada':
            return 'Confirmada';
        case 'pendente':
            return 'Pendente';
        case 'cancelada':
            return 'Cancelada';
        default:
            return status;
    }
}

// Renderizar inscrições
function renderInscricoes(inscricoes) {
    const listContainer = document.getElementById('inscricoes-list');
    const footerContainer = document.getElementById('inscricoes-footer');
    
    if (inscricoes.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>Nenhuma inscrição encontrada</p>
            </div>
        `;
        footerContainer.innerHTML = '';
        return;
    }
    
    listContainer.innerHTML = inscricoes.map(inscricao => `
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div class="flex-1 space-y-3">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <div>
                            <p class="font-medium text-gray-900">${inscricao.aluno}</p>
                            <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                                ${inscricao.email}
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        <div>
                            <p class="font-medium text-gray-900">${inscricao.palestra}</p>
                            <div class="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div class="flex items-center gap-1">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg>
                                    ${inscricao.horario}
                                </div>
                                <span>📍 ${inscricao.sala}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex lg:flex-col gap-2">
                    <span class="px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(inscricao.status)}">
                        ${getStatusText(inscricao.status)}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    footerContainer.innerHTML = `
        <p class="text-sm text-gray-600">
            Exibindo ${inscricoes.length} de ${inscricoesData.length} inscrições
        </p>
    `;
}

// Filtrar inscrições
function filtrarInscricoes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    const filtered = inscricoesData.filter(inscricao => 
        inscricao.aluno.toLowerCase().includes(searchTerm) ||
        inscricao.email.toLowerCase().includes(searchTerm) ||
        inscricao.palestra.toLowerCase().includes(searchTerm)
    );
    
    renderInscricoes(filtered);
}
