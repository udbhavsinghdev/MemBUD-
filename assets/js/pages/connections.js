// MemBUD Interactive Connections Knowledge Graph Component

import { store } from '../services/store.js';

export function renderConnectionsPage() {
  const state = store.getState();
  const graph = state.relationships;

  return `
    <div class="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-[var(--text-primary)]">Visual Memory Connections Graph</h1>
          <p class="text-xs text-[var(--text-secondary)]">Discover relationships between people, projects, events, and topics in your knowledge base.</p>
        </div>

        <div class="flex items-center gap-3 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Person</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500"></span> Project</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500"></span> Event</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-purple-500"></span> Agent</span>
        </div>
      </div>

      <!-- Graph Container Card -->
      <div class="card-surface p-6 border border-[var(--bg-card-border)] rounded-2xl relative overflow-hidden shadow-2xl min-h-[500px] flex items-center justify-center">
        <!-- Interactive SVG Canvas -->
        <svg id="connections-svg" class="w-full h-[450px] cursor-grab active:cursor-grabbing">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          <!-- SVG Edges -->
          <g id="svg-edges">
            <!-- Rahul -> FastAPI -->
            <line x1="150" y1="120" x2="380" y2="120" stroke="var(--bg-card-border)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="260" y="110" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="monospace">recommended</text>

            <!-- FastAPI -> MemBUD -->
            <line x1="380" y1="120" x2="600" y2="240" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="500" y="170" fill="var(--accent-primary)" font-size="11" text-anchor="middle" font-family="monospace">used for backend</text>

            <!-- Rahul -> Team Sync -->
            <line x1="150" y1="120" x2="220" y2="340" stroke="var(--bg-card-border)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="175" y="240" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="monospace">attended</text>

            <!-- Team Sync -> MemBUD -->
            <line x1="220" y1="340" x2="600" y2="240" stroke="var(--bg-card-border)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="400" y="300" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="monospace">discussed in</text>

            <!-- MemBUD -> PHY175 -->
            <line x1="600" y1="240" x2="450" y2="380" stroke="var(--bg-card-border)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="530" y="330" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="monospace">remembers date</text>

            <!-- MemBUD -> Google -->
            <line x1="600" y1="240" x2="780" y2="140" stroke="var(--bg-card-border)" stroke-width="2" marker-end="url(#arrow)" />
            <text x="700" y="180" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="monospace">tracks deadline</text>
          </g>

          <!-- SVG Nodes -->
          <g id="svg-nodes">
            <!-- Node: Rahul -->
            <g class="graph-node cursor-pointer" data-query="Rahul" transform="translate(150, 120)">
              <circle r="28" fill="#10B981" class="node-pulse" />
              <text y="5" fill="#FFFFFF" text-anchor="middle" font-weight="bold" font-size="12">Rahul</text>
              <text y="42" fill="var(--text-primary)" text-anchor="middle" font-size="11" font-weight="600">Rahul Sharma</text>
            </g>

            <!-- Node: FastAPI -->
            <g class="graph-node cursor-pointer" data-query="FastAPI" transform="translate(380, 120)">
              <circle r="26" fill="#3B82F6" />
              <text y="5" fill="#FFFFFF" text-anchor="middle" font-weight="bold" font-size="11">FastAPI</text>
              <text y="40" fill="var(--text-primary)" text-anchor="middle" font-size="11" font-weight="600">Backend API</text>
            </g>

            <!-- Node: MemBUD -->
            <g class="graph-node cursor-pointer" data-query="MemBUD" transform="translate(600, 240)">
              <circle r="34" fill="#8B5CF6" class="node-pulse" />
              <text y="6" fill="#FFFFFF" text-anchor="middle" font-weight="extrabold" font-size="13">MemBUD</text>
              <text y="50" fill="var(--accent-primary)" text-anchor="middle" font-size="12" font-weight="800">Central Brain</text>
            </g>

            <!-- Node: Team Sync -->
            <g class="graph-node cursor-pointer" data-query="Project Meeting" transform="translate(220, 340)">
              <circle r="26" fill="#F59E0B" />
              <text y="5" fill="#FFFFFF" text-anchor="middle" font-weight="bold" font-size="10">Sync</text>
              <text y="40" fill="var(--text-primary)" text-anchor="middle" font-size="11" font-weight="600">Team Sync (17 Sep)</text>
            </g>

            <!-- Node: PHY175 -->
            <g class="graph-node cursor-pointer" data-query="physics exam" transform="translate(450, 380)">
              <circle r="26" fill="#EF4444" />
              <text y="5" fill="#FFFFFF" text-anchor="middle" font-weight="bold" font-size="10">PHY175</text>
              <text y="40" fill="var(--text-primary)" text-anchor="middle" font-size="11" font-weight="600">Physics Exam</text>
            </g>

            <!-- Node: Google -->
            <g class="graph-node cursor-pointer" data-query="internship" transform="translate(780, 140)">
              <circle r="26" fill="#06B6D4" />
              <text y="5" fill="#FFFFFF" text-anchor="middle" font-weight="bold" font-size="10">Google</text>
              <text y="40" fill="var(--text-primary)" text-anchor="middle" font-size="11" font-weight="600">Internship OA</text>
            </g>
          </g>
        </svg>

        <div class="absolute bottom-4 left-4 bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--bg-card-border)] text-xs text-[var(--text-secondary)]">
          💡 Click any node to ask MemBUD about that entity.
        </div>
      </div>
    </div>
  `;
}

export function bindConnectionsEvents() {
  document.querySelectorAll('.graph-node').forEach(node => {
    node.onclick = () => {
      const q = node.getAttribute('data-query');
      window.location.hash = `#/chat?q=${encodeURIComponent(q)}`;
    };
  });
}
