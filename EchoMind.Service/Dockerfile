FROM continuumio/miniconda3:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Copia environment.yml do contexto de build
COPY environment.yml .

# Cria o ambiente conda
RUN conda env create -f environment.yml
ENV PATH /opt/conda/envs/echomind/bin:$PATH

# Copia todo o código do backend
COPY EchoMind.Service/ /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
