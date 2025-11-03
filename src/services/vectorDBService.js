import OpenAi from 'openai'

const client = new OpenAi({ apiKey: process.env.OPENAI_API_KEY })

// BASE VECTORIAL EN MEMORIA MOMENTANEO
const productVectors = [
  {
    id: 1,
    text: 'Cemento de alta resistencia ideal para estructuras, muros y pisos.',
    metadata: { name: 'Cemento Portland Tipo I (Bolsa 42.5 kg)', price: 28.5 },
    embedding: null
  },
  {
    id: 2,
    text: 'Varilla de acero corrugado para refuerzo de concreto en obras de construcción.',
    metadata: { name: 'Fierro Corrugado 1/2" x 9 m', price: 32.0 },
    embedding: null
  },
  {
    id: 3,
    text: 'Clavos galvanizados para carpintería y estructuras livianas.',
    metadata: { name: 'Clavo de acero 2” (caja x 1 kg)', price: 9.9 },
    embedding: null
  }
]

async function initializeEmbeddings () {
  for (const item of productVectors) {
    if (!item.embedding) {
      const res = await client.embeddings.create({
        model: 'text-embedding-3-small',
        input: item.text
      })
      item.embedding = res.data[0].embedding
    }
  }
}

export async function search (userMessage) {
  try {
    await initializeEmbeddings()

    const qEmbedding = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: userMessage
    })

    const queryVector = qEmbedding.data[0].embedding

    let bestScore = -1
    let bestMatch = null

    for (const item of productVectors) {
      const score = cosineSimilarity(item.embedding, queryVector)
      if (score > bestScore) {
        bestScore = score
        bestMatch = item
      }
    }

    return bestScore > 0.75 ? bestMatch : null
  } catch (error) {
    return null
  }
}

function cosineSimilarity (a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))
  return dot / (normA * normB)
}
