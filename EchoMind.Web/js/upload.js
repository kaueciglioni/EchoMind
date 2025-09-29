// Atualiza ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
  const uploadForm = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const uploadedFilesTable = document.getElementById('uploadedFilesTable');
  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');

  let selectedRow = null;

  // Função para pegar CSRF do cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Carrega arquivos do backend
  async function loadFilesFromBackend() {
    uploadedFilesTable.innerHTML = '';
    try {
      const response = await fetch('http://localhost:8000/audio/', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao carregar arquivos');
      const files = await response.json();

      if (files.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = 'Nenhum arquivo enviado ainda.';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        uploadedFilesTable.appendChild(tr);
        return;
      }

      files.forEach((file, idx) => {
        const tr = document.createElement('tr');
        tr.classList.add('audio-row');
        tr.dataset.id = file.guid;

        const tdName = document.createElement('td');
        tdName.textContent = file.title || file.filename.split('/').pop();

        const tdDate = document.createElement('td');
        tdDate.textContent = new Date(file.uploaded_at).toLocaleString();

        const tdDelete = document.createElement('td');
        tdDelete.style.textAlign = 'center';
        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Deletar';
        btnDelete.className = 'btn-delete';
        btnDelete.style.display = 'none';
        btnDelete.addEventListener('click', function(e) {
          e.stopPropagation();
          deleteFile(file.guid);
        });
        tdDelete.appendChild(btnDelete);

        tr.appendChild(tdName);
        tr.appendChild(tdDate);
        tr.appendChild(tdDelete);

        // Seleção de linha
        tr.addEventListener('click', function() {
          if (selectedRow && selectedRow !== tr) {
            selectedRow.classList.remove('selected');
            const prevBtn = selectedRow.querySelector('.btn-delete');
            if (prevBtn) prevBtn.style.display = 'none';
          }
          tr.classList.toggle('selected');
          btnDelete.style.display = tr.classList.contains('selected') ? 'inline-block' : 'none';
          selectedRow = tr.classList.contains('selected') ? tr : null;
        });

        uploadedFilesTable.appendChild(tr);
      });
    } catch (err) {
      alert(err.message);
    }
  }

  // Deleta arquivo no backend
  async function deleteFile(fileId) {
    try {
      const response = await fetch(`http://localhost:8000/audio/${fileId}/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
      if (!response.ok) throw new Error('Erro ao deletar arquivo');
      loadFilesFromBackend();
    } catch (err) {
      alert(err.message);
    }
  }

  // Envio do formulário
  if (uploadForm) {
    uploadForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (fileInput.files.length === 0) return;

      const formData = new FormData();
      formData.append('title', titleInput ? titleInput.value : '');
      formData.append('description', descriptionInput ? descriptionInput.value : '');
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('filename', fileInput.files[i]);
      }

      try {
        const response = await fetch('http://localhost:8000/api/uploads/', {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          }
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Erro ao enviar arquivo: ${response.status} ${text}`);
        }
        fileInput.value = '';
        if (titleInput) titleInput.value = '';
        if (descriptionInput) descriptionInput.value = '';
        loadFilesFromBackend();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Inicializa lista de arquivos
  loadFilesFromBackend();
});
