import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface OSILayer {
  number: number;
  name: string;
  germanName: string;
  function: string;
  protocols: string[];
  dataUnit: string;
  color: string;
  examples: string[];
}

const OSILayerVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAnimationLayer, setCurrentAnimationLayer] = useState<number | null>(null);

  const layers: OSILayer[] = [
    {
      number: 7,
      name: 'Application Layer',
      germanName: 'Anwendungsschicht',
      function: 'Schnittstelle zur Anwendung',
      protocols: ['HTTP', 'SMTP', 'FTP', 'DNS', 'DHCP'],
      dataUnit: 'Data',
      color: 'bg-red-500',
      examples: ['Web Browser', 'E-Mail Client', 'File Transfer']
    },
    {
      number: 6,
      name: 'Presentation Layer',
      germanName: 'Darstellungsschicht',
      function: 'Datenformatierung, Verschlüsselung',
      protocols: ['SSL/TLS', 'JPEG', 'ASCII'],
      dataUnit: 'Data',
      color: 'bg-orange-500',
      examples: ['Encryption', 'Compression', 'Data Translation']
    },
    {
      number: 5,
      name: 'Session Layer',
      germanName: 'Sitzungsschicht',
      function: 'Sitzungsverwaltung',
      protocols: ['NetBIOS', 'NFS', 'SMB'],
      dataUnit: 'Data',
      color: 'bg-yellow-500',
      examples: ['Session Control', 'Dialog Management']
    },
    {
      number: 4,
      name: 'Transport Layer',
      germanName: 'Transportschicht',
      function: 'End-to-End Übertragung',
      protocols: ['TCP', 'UDP'],
      dataUnit: 'Segment',
      color: 'bg-green-500',
      examples: ['Port Numbers', 'Flow Control', 'Error Recovery']
    },
    {
      number: 3,
      name: 'Network Layer',
      germanName: 'Vermittlungsschicht',
      function: 'Routing, logische Adressierung',
      protocols: ['IP', 'ICMP', 'OSPF'],
      dataUnit: 'Packet',
      color: 'bg-blue-500',
      examples: ['IP Addresses', 'Routing Tables', 'Subnetting']
    },
    {
      number: 2,
      name: 'Data Link Layer',
      germanName: 'Sicherungsschicht',
      function: 'Fehlererkennung, MAC-Adressen',
      protocols: ['Ethernet', 'WLAN', 'PPP'],
      dataUnit: 'Frame',
      color: 'bg-indigo-500',
      examples: ['MAC Addresses', 'CRC', 'ARP']
    },
    {
      number: 1,
      name: 'Physical Layer',
      germanName: 'Bitübertragungsschicht',
      function: 'Bitübertragung, Leitungskodierung',
      protocols: ['NRZI', '4B5B', '5B6B'],
      dataUnit: 'Bit',
      color: 'bg-purple-500',
      examples: ['Cables', 'Signals', 'Line Coding']
    }
  ];

  const startDataFlow = () => {
    setShowAnimation(true);
    setCurrentAnimationLayer(7);
    
    // Animate through each layer sequentially
    const animateLayer = (layer: number) => {
      if (layer < 1) {
        // Animation complete
        setTimeout(() => {
          setShowAnimation(false);
          setCurrentAnimationLayer(null);
        }, 500);
        return;
      }
      
      setCurrentAnimationLayer(layer);
      setTimeout(() => animateLayer(layer - 1), 600);
    };
    
    animateLayer(7);
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🏗️</span>
          OSI-Referenzmodell
        </h2>
        <p className="text-gray-600 mb-6">
          Das OSI-Modell strukturiert Netzwerkkommunikation in 7 Schichten. 
          Klicken Sie auf eine Schicht für Details oder starten Sie die Datenfluss-Animation.
        </p>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={startDataFlow}
            disabled={showAnimation}
            className={`px-6 py-2 rounded-lg transition-colors ${
              showAnimation 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {showAnimation ? '📡 Simulation läuft...' : '📡 Datenfluss simulieren'}
          </button>
        </div>

        {/* Data Flow Visualization */}
        {showAnimation && (
          <div className="section-card mb-6">
            <h3 className="text-lg font-semibold mb-4 text-green-700">
              🚀 Datenpaket-Simulation aktiv!
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-3">
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono shadow-lg">
                  📦 DATA PACKET
                </div>
                <div className="flex-1 h-3 bg-green-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-in-out"
                    style={{ 
                      width: currentAnimationLayer ? `${((8 - currentAnimationLayer) / 7) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-green-700 font-medium bg-white px-2 py-1 rounded shadow">
                  {currentAnimationLayer ? `Layer ${currentAnimationLayer} Processing...` : 'Fertig!'}
                </span>
              </div>
              <p className="text-sm text-green-600">
                Das Datenpaket durchläuft sequenziell alle OSI-Schichten von Layer 7 → 1. 
                Beachten Sie den orangenen Highlight am aktuellen Layer!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OSI Stack Visualization */}
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">OSI-Schichten</h3>
          <div className="space-y-2">
            {layers.map((layer) => (
              <div
                key={layer.number}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-500 ${
                  selectedLayer === layer.number
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } ${currentAnimationLayer === layer.number ? 'border-orange-500 bg-orange-100 shadow-xl scale-105' : ''}`}
                onClick={() => setSelectedLayer(selectedLayer === layer.number ? null : layer.number)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${layer.color} text-white rounded-full flex items-center justify-center font-bold`}>
                      {layer.number}
                    </div>
                    <div>
                      <div className="font-semibold">{layer.name}</div>
                      <div className="text-sm text-gray-600">{layer.germanName}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{layer.dataUnit}</span>
                    {selectedLayer === layer.number ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {selectedLayer === layer.number && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Funktion:</h4>
                      <p className="text-sm text-gray-600">{layer.function}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Protokolle:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {layer.protocols.map((protocol) => (
                          <span
                            key={protocol}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Beispiele:</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                        {layer.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TCP/IP Mapping */}
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">TCP/IP Modell Zuordnung</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-blue-800">Application Layer</h4>
              <p className="text-sm text-blue-600">OSI Layer 5-7 (Session, Presentation, Application)</p>
              <div className="text-xs text-blue-500 mt-1">HTTP, SMTP, FTP, DNS</div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-800">Transport Layer</h4>
              <p className="text-sm text-green-600">OSI Layer 4 (Transport)</p>
              <div className="text-xs text-green-500 mt-1">TCP, UDP</div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h4 className="font-semibold text-yellow-800">Internet Layer</h4>
              <p className="text-sm text-yellow-600">OSI Layer 3 (Network)</p>
              <div className="text-xs text-yellow-500 mt-1">IP, ICMP</div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
              <h4 className="font-semibold text-purple-800">Network Access</h4>
              <p className="text-sm text-purple-600">OSI Layer 1-2 (Physical, Data Link)</p>
              <div className="text-xs text-purple-500 mt-1">Ethernet, WLAN, Leitungskodierung</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">💡 Merkhilfe:</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Deutsch:</strong> "Alle Deutschen Studenten Trinken Verschiedene Sorten Bier"</div>
              <div><strong>English:</strong> "Please Do Not Throw Sausage Pizza Away"</div>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Types (Addressing) - Full Width */}
      <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Adressierungsarten & Kommunikationsmodelle</h3>
          <p className="text-gray-600 mb-6">
            Verschiedene Arten der Netzwerkkommunikation - von 1:1 bis 1:viele Verbindungen sowie Übertragungsrichtungen.
          </p>

          {/* Top Row - Full Width Cards */}
          <div className="space-y-8">
            {/* Unicast & Broadcast Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Unicast */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 text-2xl">Unicast</h4>
                    <p className="text-blue-600 text-base">Punkt-zu-Punkt Kommunikation</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-blue-800 text-base">Definition:</strong>
                      <p className="text-blue-700">Ein Sender kommuniziert mit genau einem Empfänger</p>
                    </div>
                    <div>
                      <strong className="text-blue-800 text-base">IPv4 Bereich:</strong>
                      <p className="text-blue-700 font-mono bg-blue-200 px-2 py-1 rounded text-sm">1.0.0.0 - 223.255.255.255</p>
                      <p className="text-blue-600 text-sm">(Klasse A, B, C)</p>
                    </div>
                    <div>
                      <strong className="text-blue-800 text-base">Beispiele:</strong>
                      <p className="text-blue-700">HTTP-Request, SSH-Verbindung, FTP-Transfer</p>
                    </div>
                  </div>

                  {/* Unicast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="260" cy="60" r="25" fill="#10B981" stroke="#047857" strokeWidth="3"/>
                      <text x="260" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Empfänger</text>
                      
                      <path d="M 90 60 L 230 60" stroke="#3B82F6" strokeWidth="4" markerEnd="url(#blueArrow)" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
                      </path>
                      <text x="160" y="45" textAnchor="middle" className="text-sm font-bold text-blue-600">1:1 Verbindung</text>
                      
                      <defs>
                        <marker id="blueArrow" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                          <polygon points="0 0, 12 4, 0 8" fill="#3B82F6"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Broadcast */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:∀</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 text-2xl">Broadcast</h4>
                    <p className="text-red-600 text-base">An alle im Netzwerk</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-red-800 text-base">Definition:</strong>
                      <p className="text-red-700">Ein Sender kommuniziert mit allen Geräten im Subnetz</p>
                    </div>
                    <div>
                      <strong className="text-red-800 text-base">IPv4 Adresse:</strong>
                      <p className="text-red-700 font-mono bg-red-200 px-2 py-1 rounded text-sm">x.x.x.255 (Limited)</p>
                      <p className="text-red-700 font-mono bg-red-200 px-2 py-1 rounded text-sm mt-1">255.255.255.255 (Directed)</p>
                    </div>
                    <div>
                      <strong className="text-red-800 text-base">Beispiele:</strong>
                      <p className="text-red-700">ARP-Requests, DHCP-Discover, WOL-Pakete</p>
                    </div>
                  </div>

                  {/* Broadcast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-red-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#EF4444" stroke="#DC2626" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="220" cy="30" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="220" y="36" textAnchor="middle" className="text-xs font-bold fill-white">PC1</text>
                      
                      <circle cx="260" cy="60" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="260" y="66" textAnchor="middle" className="text-xs font-bold fill-white">PC2</text>
                      
                      <circle cx="220" cy="90" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="220" y="96" textAnchor="middle" className="text-xs font-bold fill-white">PC3</text>
                      
                      <path d="M 90 50 L 195 25" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      <path d="M 90 60 L 235 60" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      <path d="M 90 70 L 195 85" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      
                      <text x="160" y="15" textAnchor="middle" className="text-sm font-bold text-red-600">an ALLE gleichzeitig</text>
                      
                      <defs>
                        <marker id="redArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Multicast & Anycast Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Multicast */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:n</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 text-2xl">Multicast</h4>
                    <p className="text-green-600 text-base">An eine Gruppe</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-green-800 text-base">Definition:</strong>
                      <p className="text-green-700">Ein Sender kommuniziert mit einer definierten Gruppe</p>
                    </div>
                    <div>
                      <strong className="text-green-800 text-base">IPv4 Bereich:</strong>
                      <p className="text-green-700 font-mono bg-green-200 px-2 py-1 rounded text-sm">224.0.0.0 - 239.255.255.255</p>
                      <p className="text-green-600 text-sm">(Klasse D)</p>
                    </div>
                    <div>
                      <strong className="text-green-800 text-base">Beispiele:</strong>
                      <p className="text-green-700">Video-Streaming, OSPF-Updates, PIM-Protokoll</p>
                    </div>
                  </div>

                  {/* Multicast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#10B981" stroke="#047857" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="200" cy="30" r="18" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="200" y="36" textAnchor="middle" className="text-xs font-bold fill-white">Sub</text>
                      
                      <circle cx="240" cy="60" r="18" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="240" y="66" textAnchor="middle" className="text-xs font-bold fill-white">Sub</text>
                      
                      <circle cx="200" cy="90" r="18" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>
                      <text x="200" y="96" textAnchor="middle" className="text-xs font-bold fill-white">No</text>
                      
                      <circle cx="280" cy="40" r="18" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>
                      <text x="280" y="46" textAnchor="middle" className="text-xs font-bold fill-white">No</text>
                      
                      <path d="M 90 50 L 175 25" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrow)"/>
                      <path d="M 90 60 L 215 60" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrow)"/>
                      <path d="M 90 70 L 175 85" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      <path d="M 90 50 L 255 35" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      
                      <text x="160" y="15" textAnchor="middle" className="text-sm font-bold text-green-600">nur Subscriber</text>
                      
                      <defs>
                        <marker id="greenArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Anycast */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:?</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 text-2xl">Anycast</h4>
                    <p className="text-purple-600 text-base">An den nächsten Server</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-purple-800 text-base">Definition:</strong>
                      <p className="text-purple-700">Mehrere Server mit gleicher IP, nächster wird ausgewählt</p>
                    </div>
                    <div>
                      <strong className="text-purple-800 text-base">Implementierung:</strong>
                      <p className="text-purple-700 font-mono bg-purple-200 px-2 py-1 rounded text-sm">IPv6 nativ</p>
                      <p className="text-purple-700 font-mono bg-purple-200 px-2 py-1 rounded text-sm mt-1">IPv4 über BGP-Routing</p>
                    </div>
                    <div>
                      <strong className="text-purple-800 text-base">Beispiele:</strong>
                      <p className="text-purple-700">DNS Root-Server, CDN-Knoten, IPv6 Router</p>
                    </div>
                  </div>

                  {/* Anycast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Client</text>
                      
                      <circle cx="200" cy="30" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                      <text x="200" y="36" textAnchor="middle" className="text-xs font-bold fill-white">NYC</text>
                      
                      <circle cx="240" cy="60" r="18" fill="#10B981" stroke="#047857" strokeWidth="4"/>
                      <text x="240" y="66" textAnchor="middle" className="text-xs font-bold fill-white">LON</text>
                      
                      <circle cx="280" cy="90" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                      <text x="280" y="96" textAnchor="middle" className="text-xs font-bold fill-white">TOK</text>
                      
                      <path d="M 90 60 L 215 60" stroke="#8B5CF6" strokeWidth="4" markerEnd="url(#purpleArrow)"/>
                      <path d="M 90 50 L 175 25" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      <path d="M 90 70 L 255 85" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      
                      <text x="160" y="45" textAnchor="middle" className="text-sm font-bold text-purple-600">nächster Server</text>
                      <text x="160" y="105" textAnchor="middle" className="text-xs text-purple-500">basierend auf Latenz</text>
                      
                      <defs>
                        <marker id="purpleArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-8 overflow-x-auto">
            <h4 className="font-semibold mb-4">📊 Vergleichstabelle:</h4>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Typ</th>
                  <th className="px-4 py-2 border-b text-left">Verhältnis</th>
                  <th className="px-4 py-2 border-b text-left">IPv4 Bereich</th>
                  <th className="px-4 py-2 border-b text-left">Effizienz</th>
                  <th className="px-4 py-2 border-b text-left">Anwendung</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-blue-600">Unicast</td>
                  <td className="px-4 py-2 border-b">1:1</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">1.0.0.0 - 223.255.255.255</td>
                  <td className="px-4 py-2 border-b">🟢 Hoch</td>
                  <td className="px-4 py-2 border-b">Standard-Kommunikation</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-red-600">Broadcast</td>
                  <td className="px-4 py-2 border-b">1:alle</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">x.x.x.255, 255.255.255.255</td>
                  <td className="px-4 py-2 border-b">🔴 Niedrig</td>
                  <td className="px-4 py-2 border-b">ARP, DHCP, Service Discovery</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-green-600">Multicast</td>
                  <td className="px-4 py-2 border-b">1:n</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">224.0.0.0 - 239.255.255.255</td>
                  <td className="px-4 py-2 border-b">🟡 Mittel</td>
                  <td className="px-4 py-2 border-b">Streaming, Routing-Updates</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-purple-600">Anycast</td>
                  <td className="px-4 py-2 border-b">1:nächster</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">Normale IP + BGP Routing</td>
                  <td className="px-4 py-2 border-b">🟢 Hoch</td>
                  <td className="px-4 py-2 border-b">CDN, DNS, Load Balancing</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Practical Examples */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">🌐 Internet-Beispiele:</h5>
              <div className="space-y-2 text-sm text-blue-700">
                <div><strong>Unicast:</strong> Webseitenaufruf (HTTP/HTTPS)</div>
                <div><strong>Multicast:</strong> IPTV, Video-Konferenzen</div>
                <div><strong>Anycast:</strong> Google DNS (8.8.8.8), Cloudflare</div>
                <div><strong>Broadcast:</strong> Wake-on-LAN im lokalen Netz</div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h5 className="font-semibold text-orange-800 mb-2">🏢 Enterprise-Szenarien:</h5>
              <div className="space-y-2 text-sm text-orange-700">
                <div><strong>Unicast:</strong> E-Mail, File-Transfer, Remote-Desktop</div>
                <div><strong>Multicast:</strong> Software-Updates, Live-Übertragungen</div>
                <div><strong>Anycast:</strong> Load-Balancer, Geo-DNS</div>
                <div><strong>Broadcast:</strong> DHCP-Requests, NetBIOS-Namen</div>
              </div>
            </div>
          </div>

          {/* Duplex Communication Modes */}
          <div className="mt-8">
            <h4 className="font-semibold mb-6 text-lg">🔄 Übertragungsrichtungen (Duplex-Modi):</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Simplex */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">→</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-800 text-xl">Simplex</h5>
                    <p className="text-red-600 text-sm">Einseitige Übertragung</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <strong className="text-red-800">Definition:</strong>
                    <p className="text-red-700 text-sm">Daten fließen nur in eine Richtung</p>
                  </div>
                  <div>
                    <strong className="text-red-800">Eigenschaften:</strong>
                    <p className="text-red-700 text-sm">Sender kann nur senden, Empfänger kann nur empfangen</p>
                  </div>
                  <div>
                    <strong className="text-red-800">Beispiele:</strong>
                    <p className="text-red-700 text-sm">Radio, TV-Broadcast, Keyboard → PC</p>
                  </div>
                </div>

                {/* Simplex Visualization */}
                <div className="bg-white p-4 rounded-lg border-2 border-red-200 shadow-inner mt-4">
                  <svg width="100%" height="80" viewBox="0 0 280 80" className="mx-auto">
                    <circle cx="50" cy="40" r="20" fill="#EF4444" stroke="#DC2626" strokeWidth="2"/>
                    <text x="50" y="46" textAnchor="middle" className="text-xs font-bold fill-white">Sender</text>
                    
                    <circle cx="230" cy="40" r="20" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
                    <text x="230" y="46" textAnchor="middle" className="text-xs font-bold fill-white">Empfänger</text>
                    
                    <path d="M 75 40 L 205 40" stroke="#EF4444" strokeWidth="4" markerEnd="url(#redArrowSimplex)"/>
                    <text x="140" y="30" textAnchor="middle" className="text-xs font-bold text-red-600">nur eine Richtung</text>
                    
                    <defs>
                      <marker id="redArrowSimplex" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                        <polygon points="0 0, 12 4, 0 8" fill="#EF4444"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Half-Duplex */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">⇄</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-yellow-800 text-xl">Halbduplex</h5>
                    <p className="text-yellow-600 text-sm">Wechselseitige Übertragung</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <strong className="text-yellow-800">Definition:</strong>
                    <p className="text-yellow-700 text-sm">Bidirektional, aber nicht gleichzeitig</p>
                  </div>
                  <div>
                    <strong className="text-yellow-800">Eigenschaften:</strong>
                    <p className="text-yellow-700 text-sm">Abwechselnd senden/empfangen (Turn-Taking)</p>
                  </div>
                  <div>
                    <strong className="text-yellow-800">Beispiele:</strong>
                    <p className="text-yellow-700 text-sm">Walkie-Talkie, CSMA/CD (Hub), RS-485</p>
                  </div>
                </div>

                {/* Half-Duplex Visualization */}
                <div className="bg-white p-4 rounded-lg border-2 border-yellow-200 shadow-inner mt-4">
                  <svg width="100%" height="80" viewBox="0 0 280 80" className="mx-auto">
                    <circle cx="50" cy="40" r="20" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                    <text x="50" y="46" textAnchor="middle" className="text-xs font-bold fill-white">A</text>
                    
                    <circle cx="230" cy="40" r="20" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                    <text x="230" y="46" textAnchor="middle" className="text-xs font-bold fill-white">B</text>
                    
                    <path d="M 75 35 L 205 35" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#yellowArrowHalf)" strokeDasharray="8,4"/>
                    <path d="M 205 45 L 75 45" stroke="#9CA3AF" strokeWidth="3" markerEnd="url(#grayArrowHalf)" strokeDasharray="4,8"/>
                    
                    <text x="140" y="25" textAnchor="middle" className="text-xs font-bold text-yellow-600">A → B (aktiv)</text>
                    <text x="140" y="60" textAnchor="middle" className="text-xs text-gray-500">B → A (wartet)</text>
                    
                    <defs>
                      <marker id="yellowArrowHalf" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B"/>
                      </marker>
                      <marker id="grayArrowHalf" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Full-Duplex */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">⇅</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-green-800 text-xl">Vollduplex</h5>
                    <p className="text-green-600 text-sm">Simultane Übertragung</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <strong className="text-green-800">Definition:</strong>
                    <p className="text-green-700 text-sm">Bidirektional und gleichzeitig</p>
                  </div>
                  <div>
                    <strong className="text-green-800">Eigenschaften:</strong>
                    <p className="text-green-700 text-sm">Separater Sende- und Empfangskanal</p>
                  </div>
                  <div>
                    <strong className="text-green-800">Beispiele:</strong>
                    <p className="text-green-700 text-sm">Ethernet (Switch), Telefon, LWL</p>
                  </div>
                </div>

                {/* Full-Duplex Visualization */}
                <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow-inner mt-4">
                  <svg width="100%" height="80" viewBox="0 0 280 80" className="mx-auto">
                    <circle cx="50" cy="40" r="20" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                    <text x="50" y="46" textAnchor="middle" className="text-xs font-bold fill-white">A</text>
                    
                    <circle cx="230" cy="40" r="20" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                    <text x="230" y="46" textAnchor="middle" className="text-xs font-bold fill-white">B</text>
                    
                    <path d="M 75 32 L 205 32" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrowFull)"/>
                    <path d="M 205 48 L 75 48" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrowFull2)"/>
                    
                    <text x="140" y="22" textAnchor="middle" className="text-xs font-bold text-green-600">A → B</text>
                    <text x="140" y="65" textAnchor="middle" className="text-xs font-bold text-green-600">B → A</text>
                    <text x="140" y="75" textAnchor="middle" className="text-xs text-green-500">(gleichzeitig)</text>
                    
                    <defs>
                      <marker id="greenArrowFull" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                      </marker>
                      <marker id="greenArrowFull2" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Duplex Comparison Table */}
            <div className="mt-6 overflow-x-auto">
              <h5 className="font-semibold mb-3">📊 Duplex-Modi Vergleich:</h5>
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Modus</th>
                    <th className="px-4 py-2 border-b text-left">Richtung</th>
                    <th className="px-4 py-2 border-b text-left">Gleichzeitig</th>
                    <th className="px-4 py-2 border-b text-left">Bandbreite-Effizienz</th>
                    <th className="px-4 py-2 border-b text-left">Typische Anwendung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b font-semibold text-red-600">Simplex</td>
                    <td className="px-4 py-2 border-b">Unidirektional</td>
                    <td className="px-4 py-2 border-b">N/A</td>
                    <td className="px-4 py-2 border-b">🟢 100%</td>
                    <td className="px-4 py-2 border-b">Broadcasting, Sensoren</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b font-semibold text-yellow-600">Halbduplex</td>
                    <td className="px-4 py-2 border-b">Bidirektional</td>
                    <td className="px-4 py-2 border-b">❌ Nein</td>
                    <td className="px-4 py-2 border-b">🟡 ~50%</td>
                    <td className="px-4 py-2 border-b">CSMA/CD, Shared Medium</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b font-semibold text-green-600">Vollduplex</td>
                    <td className="px-4 py-2 border-b">Bidirektional</td>
                    <td className="px-4 py-2 border-b">✅ Ja</td>
                    <td className="px-4 py-2 border-b">🟢 200%</td>
                    <td className="px-4 py-2 border-b">Moderne Ethernet, Telefon</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Practical Examples */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h6 className="font-semibold text-blue-800 mb-2">💡 Netzwerk-Beispiele:</h6>
                <div className="space-y-2 text-sm text-blue-700">
                  <div><strong>Simplex:</strong> Syslog-Server ← Client</div>
                  <div><strong>Halbduplex:</strong> Hub-basiertes Ethernet</div>
                  <div><strong>Vollduplex:</strong> Switch-Port, Punkt-zu-Punkt Links</div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h6 className="font-semibold text-orange-800 mb-2">⚡ Performance-Impact:</h6>
                <div className="space-y-2 text-sm text-orange-700">
                  <div><strong>Kollisionen:</strong> Nur bei Halbduplex</div>
                  <div><strong>Bandbreite:</strong> Vollduplex = 2x theoretisch</div>
                  <div><strong>Latenz:</strong> Simplex &lt; Vollduplex &lt; Halbduplex</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Layer 2 Addressing - MAC, ARP, etc. */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🔗 Adressierung der Sicherungsschicht (Layer 2)</h3>
        <p className="text-gray-600 mb-6">
          MAC-Adressen, ARP-Protokoll, Broadcast-Adressen und Sicherheitsaspekte der Layer-2-Adressierung.
        </p>

        <div className="space-y-8">
          {/* MAC Addresses */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">MAC</span>
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-2xl">MAC-Adressen</h4>
                <p className="text-blue-600 text-base">Media Access Control - Eindeutige Hardware-Identifikation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-blue-800 text-base">Format & Struktur:</strong>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-inner mt-2">
                    <div className="font-mono text-lg text-center text-blue-700 mb-2">00:1A:2B:3C:4D:5E</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-blue-100 p-2 rounded text-center">
                        <div className="font-bold text-blue-800">OUI</div>
                        <div className="text-blue-600">00:1A:2B</div>
                        <div className="text-xs text-blue-500">Hersteller-ID</div>
                      </div>
                      <div className="bg-green-100 p-2 rounded text-center">
                        <div className="font-bold text-green-800">NIC</div>
                        <div className="text-green-600">3C:4D:5E</div>
                        <div className="text-xs text-green-500">Geräte-ID</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <strong className="text-blue-800 text-base">Eigenschaften:</strong>
                  <div className="space-y-2 text-sm text-blue-700 mt-2">
                    <div>• <strong>Länge:</strong> 48 Bit (6 Bytes)</div>
                    <div>• <strong>Eindeutigkeit:</strong> Weltweit eindeutig (theoretisch)</div>
                    <div>• <strong>Brennbar:</strong> Im ROM der Netzwerkkarte gespeichert</div>
                    <div>• <strong>Scope:</strong> Nur im lokalen Netzwerksegment gültig</div>
                    <div>• <strong>Format:</strong> Hexadezimal (0-9, A-F)</div>
                  </div>
                </div>

                <div>
                  <strong className="text-blue-800 text-base">Spezielle Adressen:</strong>
                  <div className="space-y-2 text-sm text-blue-700 mt-2">
                    <div>• <strong>Broadcast:</strong> FF:FF:FF:FF:FF:FF</div>
                    <div>• <strong>Multicast:</strong> Erstes Bit = 1 (ungerade erste Hexzahl)</div>
                    <div>• <strong>Unicast:</strong> Erstes Bit = 0 (gerade erste Hexzahl)</div>
                    <div>• <strong>Local Admin:</strong> Zweites Bit = 1 (manuell gesetzt)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h6 className="font-semibold text-blue-800 mb-2">🏭 OUI-Beispiele:</h6>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div><span className="font-mono bg-blue-100 px-1 rounded">00:50:56</span> VMware</div>
                    <div><span className="font-mono bg-blue-100 px-1 rounded">00:0C:29</span> VMware (alt)</div>
                    <div><span className="font-mono bg-blue-100 px-1 rounded">08:00:27</span> VirtualBox</div>
                    <div><span className="font-mono bg-blue-100 px-1 rounded">00:1B:63</span> Apple</div>
                    <div><span className="font-mono bg-blue-100 px-1 rounded">00:50:B6</span> Intel</div>
                    <div><span className="font-mono bg-blue-100 px-1 rounded">00:E0:4C</span> Realtek</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h6 className="font-semibold text-blue-800 mb-2">🔍 MAC-Adress-Analyse:</h6>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div><strong>Bit 0 (I/G):</strong> Individual/Group Flag</div>
                    <div className="text-xs pl-4">0 = Unicast, 1 = Multicast/Broadcast</div>
                    <div><strong>Bit 1 (U/L):</strong> Universal/Local Flag</div>
                    <div className="text-xs pl-4">0 = Global eindeutig, 1 = Lokal verwaltet</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h6 className="font-semibold text-yellow-800 mb-2">⚠️ Wichtige Fakten:</h6>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>• MAC-Adressen können softwareseitig geändert werden</div>
                    <div>• Keine Routing-Information enthalten</div>
                    <div>• Router ersetzen MAC-Adressen in Frames</div>
                    <div>• Nur für lokale Kommunikation relevant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ARP Protocol */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">ARP</span>
              </div>
              <div>
                <h4 className="font-bold text-green-800 text-2xl">Address Resolution Protocol</h4>
                <p className="text-green-600 text-base">Auflösung von IP-Adressen zu MAC-Adressen</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* ARP Process Visualization */}
              <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow-inner">
                <h6 className="font-semibold text-green-800 mb-4 text-center">🔄 ARP-Prozess Ablauf:</h6>
                <svg width="100%" height="300" viewBox="0 0 800 300" className="mx-auto">
                  {/* Devices */}
                  <rect x="50" y="100" width="120" height="80" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" rx="10"/>
                  <text x="110" y="130" textAnchor="middle" className="text-sm font-bold fill-white">PC A</text>
                  <text x="110" y="145" textAnchor="middle" className="text-xs fill-white">192.168.1.10</text>
                  <text x="110" y="160" textAnchor="middle" className="text-xs fill-white">AA:BB:CC:DD:EE:11</text>

                  <rect x="630" y="100" width="120" height="80" fill="#10B981" stroke="#047857" strokeWidth="2" rx="10"/>
                  <text x="690" y="130" textAnchor="middle" className="text-sm font-bold fill-white">PC B</text>
                  <text x="690" y="145" textAnchor="middle" className="text-xs fill-white">192.168.1.20</text>
                  <text x="690" y="160" textAnchor="middle" className="text-xs fill-white">AA:BB:CC:DD:EE:22</text>

                  {/* Switch */}
                  <rect x="350" y="120" width="100" height="40" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="5"/>
                  <text x="400" y="142" textAnchor="middle" className="text-sm font-bold fill-white">Switch</text>

                  {/* ARP Request */}
                  <path d="M 170 120 L 620 120" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrowARP)"/>
                  <text x="400" y="110" textAnchor="middle" className="text-sm font-bold text-red-600">ARP Request (Broadcast)</text>
                  <text x="400" y="95" textAnchor="middle" className="text-xs text-red-500">"Wer hat 192.168.1.20?"</text>

                  {/* ARP Reply */}
                  <path d="M 620 160 L 170 160" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrowARP)"/>
                  <text x="400" y="175" textAnchor="middle" className="text-sm font-bold text-green-600">ARP Reply (Unicast)</text>
                  <text x="400" y="190" textAnchor="middle" className="text-xs text-green-500">"Ich bin 192.168.1.20: AA:BB:CC:DD:EE:22"</text>

                  {/* Broadcast cloud */}
                  <ellipse cx="400" cy="50" rx="150" ry="25" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5"/>
                  <text x="400" y="35" textAnchor="middle" className="text-xs text-red-600">Broadcast-Domain</text>

                  <defs>
                    <marker id="redArrowARP" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                      <polygon points="0 0, 12 4, 0 8" fill="#EF4444"/>
                    </marker>
                    <marker id="greenArrowARP" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                      <polygon points="0 0, 12 4, 0 8" fill="#10B981"/>
                    </marker>
                  </defs>
                </svg>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <strong className="text-green-800 text-base">ARP-Prozess Schritte:</strong>
                    <div className="space-y-2 text-sm text-green-700 mt-2">
                      <div><strong>1. ARP Request:</strong> Broadcast an alle im Segment</div>
                      <div><strong>2. Ziel-Check:</strong> Nur das Zielgerät antwortet</div>
                      <div><strong>3. ARP Reply:</strong> Unicast-Antwort mit MAC-Adresse</div>
                      <div><strong>4. Cache Update:</strong> Beide Geräte aktualisieren ARP-Tabelle</div>
                    </div>
                  </div>

                  <div>
                    <strong className="text-green-800 text-base">ARP-Paket Format:</strong>
                    <div className="bg-gray-50 p-3 rounded border mt-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Hardware Type (2B)</div>
                        <div>Protocol Type (2B)</div>
                        <div>HW Len (1B)</div>
                        <div>Proto Len (1B)</div>
                        <div className="col-span-2">Operation (2B)</div>
                        <div className="col-span-2">Sender MAC (6B)</div>
                        <div className="col-span-2">Sender IP (4B)</div>
                        <div className="col-span-2">Target MAC (6B)</div>
                        <div className="col-span-2">Target IP (4B)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h6 className="font-semibold text-green-800 mb-2">📝 ARP-Tabelle Beispiel:</h6>
                    <div className="font-mono text-xs space-y-1 text-green-700">
                      <div className="grid grid-cols-3 gap-2 font-bold border-b">
                        <div>IP</div>
                        <div>MAC</div>
                        <div>TTL</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>192.168.1.1</div>
                        <div>00:1A:2B:3C:4D:5E</div>
                        <div>300s</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>192.168.1.20</div>
                        <div>AA:BB:CC:DD:EE:22</div>
                        <div>120s</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h6 className="font-semibold text-blue-800 mb-2">🔧 ARP-Kommandos:</h6>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div><span className="font-mono bg-blue-100 px-1 rounded">arp -a</span> - Alle Einträge anzeigen</div>
                      <div><span className="font-mono bg-blue-100 px-1 rounded">arp -d IP</span> - Eintrag löschen</div>
                      <div><span className="font-mono bg-blue-100 px-1 rounded">arp -s IP MAC</span> - Statischen Eintrag erstellen</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h6 className="font-semibold text-yellow-800 mb-2">⏰ ARP-Caching:</h6>
                    <div className="space-y-1 text-sm text-yellow-700">
                      <div>• <strong>TTL:</strong> Typisch 2-20 Minuten</div>
                      <div>• <strong>Gratuitous ARP:</strong> Ankündigung eigener IP</div>
                      <div>• <strong>ARP Aging:</strong> Automatisches Löschen alter Einträge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Broadcast Addresses */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">📡</span>
              </div>
              <div>
                <h4 className="font-bold text-red-800 text-2xl">Broadcast-Adressen</h4>
                <p className="text-red-600 text-base">Adressierung aller Geräte im Netzwerksegment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-red-800 text-base">Layer 2 Broadcast:</strong>
                  <div className="bg-white p-4 rounded-lg border-2 border-red-200 shadow-inner mt-2">
                    <div className="text-center">
                      <div className="font-mono text-xl text-red-700 mb-2">FF:FF:FF:FF:FF:FF</div>
                      <div className="text-sm text-red-600">Alle 48 Bits auf 1 gesetzt</div>
                      <div className="text-xs text-red-500 mt-2">Erreicht alle Geräte im Switch-Domain</div>
                    </div>
                  </div>
                </div>

                <div>
                  <strong className="text-red-800 text-base">Broadcast-Verhalten:</strong>
                  <div className="space-y-2 text-sm text-red-700 mt-2">
                    <div>• <strong>Switches:</strong> Frame an alle Ports weiterleiten</div>
                    <div>• <strong>Router:</strong> Broadcasts NICHT weiterleiten</div>
                    <div>• <strong>Empfänger:</strong> Alle Geräte verarbeiten Frame</div>
                    <div>• <strong>Scope:</strong> Nur innerhalb der Broadcast-Domain</div>
                  </div>
                </div>

                <div>
                  <strong className="text-red-800 text-base">Broadcast-Anwendungen:</strong>
                  <div className="space-y-2 text-sm text-red-700 mt-2">
                    <div>• <strong>ARP Requests:</strong> MAC-Adresse finden</div>
                    <div>• <strong>DHCP Discover:</strong> DHCP-Server finden</div>
                    <div>• <strong>Wake-on-LAN:</strong> Computer aufwecken</div>
                    <div>• <strong>NetBIOS:</strong> Name Resolution</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h6 className="font-semibold text-red-800 mb-2">🌐 Broadcast-Domains:</h6>
                  <div className="space-y-2 text-sm text-red-700">
                    <div><strong>Begrenzt durch:</strong></div>
                    <div className="pl-4">• Router (Layer 3 Geräte)</div>
                    <div className="pl-4">• VLANs (logische Trennung)</div>
                    <div className="pl-4">• Layer 3 Switches</div>
                    <div><strong>Nicht begrenzt durch:</strong></div>
                    <div className="pl-4">• Hubs</div>
                    <div className="pl-4">• Switches (Layer 2)</div>
                    <div className="pl-4">• Repeater</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h6 className="font-semibold text-orange-800 mb-2">⚠️ Broadcast-Probleme:</h6>
                  <div className="space-y-1 text-sm text-orange-700">
                    <div>• <strong>Broadcast Storm:</strong> Überlastung durch zu viele Broadcasts</div>
                    <div>• <strong>Performance:</strong> Alle Geräte müssen Frame verarbeiten</div>
                    <div>• <strong>Sicherheit:</strong> Alle Geräte sehen Broadcast-Traffic</div>
                    <div>• <strong>Skalierung:</strong> Problem in großen Netzwerken</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h6 className="font-semibold text-blue-800 mb-2">🔍 Broadcast-Analyse:</h6>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• <strong>Wireshark Filter:</strong> <span className="font-mono bg-blue-100 px-1 rounded">eth.dst == ff:ff:ff:ff:ff:ff</span></div>
                    <div>• <strong>Normal:</strong> 1-5% des Traffics</div>
                    <div>• <strong>Problem:</strong> &gt;10% Broadcast-Traffic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAC Spoofing */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🎭</span>
              </div>
              <div>
                <h4 className="font-bold text-purple-800 text-2xl">MAC-Spoofing</h4>
                <p className="text-purple-600 text-base">Manipulation von MAC-Adressen für verschiedene Zwecke</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <strong className="text-purple-800 text-base">Was ist MAC-Spoofing?</strong>
                  <div className="space-y-2 text-sm text-purple-700 mt-2">
                    <div>• <strong>Definition:</strong> Änderung der MAC-Adresse einer Netzwerkkarte</div>
                    <div>• <strong>Software-basiert:</strong> Änderung im Betriebssystem/Treiber</div>
                    <div>• <strong>Temporär:</strong> Reset bei Neustart (meist)</div>
                    <div>• <strong>Einfach:</strong> Mit Standard-Tools möglich</div>
                  </div>
                </div>

                <div>
                  <strong className="text-purple-800 text-base">Spoofing-Kommandos:</strong>
                  <div className="bg-gray-50 p-3 rounded border mt-2">
                    <div className="space-y-2 text-xs font-mono text-purple-700">
                      <div><strong>Linux:</strong></div>
                      <div>ifconfig eth0 down</div>
                      <div>ifconfig eth0 hw ether 00:11:22:33:44:55</div>
                      <div>ifconfig eth0 up</div>
                      <div className="mt-2"><strong>Windows:</strong></div>
                      <div>Device Manager → Network Adapter Properties</div>
                      <div><strong>macOS:</strong></div>
                      <div>sudo ifconfig en0 ether 00:11:22:33:44:55</div>
                    </div>
                  </div>
                </div>

                <div>
                  <strong className="text-purple-800 text-base">Legitimate Anwendungen:</strong>
                  <div className="space-y-2 text-sm text-purple-700 mt-2">
                    <div>• <strong>Privacy:</strong> Tracking-Schutz in öffentlichen WLANs</div>
                    <div>• <strong>Testing:</strong> Netzwerk- und Sicherheitstests</div>
                    <div>• <strong>Bypass:</strong> MAC-basierte Zugangskontrollen umgehen</div>
                    <div>• <strong>VM Migration:</strong> Nahtloser Server-Umzug</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h6 className="font-semibold text-red-800 mb-2">🚨 Sicherheitsrisiken:</h6>
                  <div className="space-y-2 text-sm text-red-700">
                    <div><strong>ARP Poisoning:</strong></div>
                    <div className="pl-4">• Falsche MAC-IP-Zuordnungen verbreiten</div>
                    <div className="pl-4">• Man-in-the-Middle Angriffe ermöglichen</div>
                    <div><strong>Identity Theft:</strong></div>
                    <div className="pl-4">• Als anderes Gerät ausgeben</div>
                    <div className="pl-4">• Zugang zu geschützten Ressourcen</div>
                    <div><strong>MAC Flooding:</strong></div>
                    <div className="pl-4">• Switch-Tabellen überlasten</div>
                    <div className="pl-4">• Failopen zu Hub-Verhalten</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h6 className="font-semibold text-green-800 mb-2">🛡️ Schutzmaßnahmen:</h6>
                  <div className="space-y-2 text-sm text-green-700">
                    <div><strong>Port Security:</strong></div>
                    <div className="pl-4">• Maximale MAC-Adressen pro Port begrenzen</div>
                    <div className="pl-4">• Sticky MAC Learning</div>
                    <div><strong>Dynamic ARP Inspection:</strong></div>
                    <div className="pl-4">• ARP-Pakete gegen DHCP-Binding prüfen</div>
                    <div><strong>802.1X Authentication:</strong></div>
                    <div className="pl-4">• Benutzer-basierte Authentifizierung</div>
                    <div><strong>Network Monitoring:</strong></div>
                    <div className="pl-4">• Anomalien in MAC-Tabellen erkennen</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h6 className="font-semibold text-blue-800 mb-2">🔍 Erkennung:</h6>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• <strong>ARP-Tabellen überwachen:</strong> Doppelte/wechselnde Einträge</div>
                    <div>• <strong>Switch-Logs:</strong> MAC-Flapping-Meldungen</div>
                    <div>• <strong>OUI-Checking:</strong> Ungewöhnliche Hersteller-IDs</div>
                    <div>• <strong>SIEM-Alerts:</strong> Automatische Anomalie-Erkennung</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAC Spoofing Demo */}
            <div className="mt-6 bg-white p-6 rounded-lg border-2 border-purple-200 shadow-inner">
              <h6 className="font-semibold text-purple-800 mb-4 text-center">🎭 MAC-Spoofing Szenario:</h6>
              <svg width="100%" height="200" viewBox="0 0 800 200" className="mx-auto">
                {/* Original */}
                <rect x="50" y="50" width="120" height="60" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" rx="10"/>
                <text x="110" y="75" textAnchor="middle" className="text-sm font-bold fill-white">Legitimate PC</text>
                <text x="110" y="90" textAnchor="middle" className="text-xs fill-white">MAC: AA:BB:CC:DD:EE:11</text>

                {/* Spoofed */}
                <rect x="50" y="130" width="120" height="60" fill="#EF4444" stroke="#DC2626" strokeWidth="2" rx="10"/>
                <text x="110" y="155" textAnchor="middle" className="text-sm font-bold fill-white">Attacker PC</text>
                <text x="110" y="170" textAnchor="middle" className="text-xs fill-white">MAC: AA:BB:CC:DD:EE:11</text>

                {/* Switch */}
                <rect x="350" y="90" width="100" height="40" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="5"/>
                <text x="400" y="112" textAnchor="middle" className="text-sm font-bold fill-white">Switch</text>

                {/* Server */}
                <rect x="630" y="90" width="120" height="40" fill="#10B981" stroke="#047857" strokeWidth="2" rx="10"/>
                <text x="690" y="112" textAnchor="middle" className="text-sm font-bold fill-white">Server</text>

                {/* Connections */}
                <line x1="170" y1="80" x2="350" y2="100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="170" y1="160" x2="350" y2="120" stroke="#EF4444" strokeWidth="3"/>
                <line x1="450" y1="110" x2="630" y2="110" stroke="#10B981" strokeWidth="3"/>

                <text x="260" y="75" className="text-xs text-blue-600">Original (offline)</text>
                <text x="260" y="145" className="text-xs text-red-600">Spoofed (aktiv)</text>
                <text x="540" y="105" className="text-xs text-green-600">Traffic geht zu Angreifer</text>

                {/* Warning */}
                <text x="400" y="30" textAnchor="middle" className="text-sm font-bold text-red-600">⚠️ Gleiche MAC-Adresse!</text>
              </svg>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-4">📚 Zusammenfassung Layer-2-Adressierung:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">🔑 Kern-Konzepte:</h6>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• <strong>MAC-Adressen:</strong> 48-Bit eindeutige Hardware-Identifikation</div>
                  <div>• <strong>ARP:</strong> IP-zu-MAC Auflösung für lokale Kommunikation</div>
                  <div>• <strong>Broadcast:</strong> FF:FF:FF:FF:FF:FF erreicht alle Geräte</div>
                  <div>• <strong>Spoofing:</strong> MAC-Adressen können geändert werden</div>
                </div>
              </div>
              
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">⚠️ Wichtige Punkte:</h6>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• MAC-Adressen nur lokal gültig (Router ersetzen sie)</div>
                  <div>• ARP-Cache wichtig für Performance</div>
                  <div>• Broadcasts können Performance beeinträchtigen</div>
                  <div>• MAC-basierte Sicherheit ist unsicher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSILayerVisualizer;