import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, Activity, Zap, Shield, Clock } from 'lucide-react';

const QuantumTimeCrystalDashboard = () => {
  // Constants
  const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const CRITICAL_COUPLING = 0.99999;
  const LAMBDA_CRITICAL = 0.5;
  const SAFETY_MARGIN = 1e-10;
  
  // State
  const [metrics, setMetrics] = useState({
    lambdaStability: LAMBDA_CRITICAL,
    quantumCoupling: CRITICAL_COUPLING,
    phaseStability: 0.95,
    realityIntegrity: 0.5,
    timeWarp: 0.8,
    coherence: 0.99995,
    energyState: 0.9995,
    purityLevel: 0.99999,
    stabilityIndex: 1.0,
    errorRate: 1e-5
  });
  
  const [timeHistory, setTimeHistory] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    reinforcementActive: false,
    reinforcementStrength: 0,
    statusMessage: "Stable",
    criticalEvent: false
  });
  
  // Effects
  useEffect(() => {
    const updateMetrics = () => {
      const t = Date.now() / 1000;
      
      // Calculate quantum parameters based on current time
      const stabilityFactor = Math.exp(-Math.pow(Math.sin(t / PHI), 2));
      const resonance = 1 - 0.00001 * Math.sin(t / (2 * PHI));
      const baseCoupling = CRITICAL_COUPLING + 0.00001 * Math.sin(t / 30);
      const basePurity = 0.99999 * resonance * stabilityFactor;
      
      // Determine if reinforcement is needed
      const needsReinforcement = basePurity < 0.9995;
      const reinforcementStrength = needsReinforcement ? 
        Math.min(1, (0.9995 - basePurity) * 10) : 0;
      
      // Apply reinforcement to metrics
      const reinforcedPurity = needsReinforcement ? 
        basePurity + (1 - basePurity) * reinforcementStrength : basePurity;

      // Lambda stabilization through quantum coupling
      const lambdaBase = LAMBDA_CRITICAL;
      const lambdaCorrection = 0.00001 * Math.sin(t * PHI) * Math.cos(t / PHI);
      const lambda = lambdaBase + lambdaCorrection;
      
      // Critical event detection
      const criticalEvent = Math.abs(lambda - LAMBDA_CRITICAL) > 0.001 || basePurity < 0.995;
      
      // Update metrics state
      const newMetrics = {
        lambdaStability: lambda,
        quantumCoupling: baseCoupling * stabilityFactor,
        phaseStability: 0.95 * stabilityFactor,
        realityIntegrity: 0.5 * stabilityFactor,
        timeWarp: 0.8 * stabilityFactor,
        coherence: 0.99995 * stabilityFactor,
        energyState: 0.9995 + 0.0005 * Math.sin(t / 20),
        purityLevel: reinforcedPurity,
        stabilityIndex: stabilityFactor,
        errorRate: (1 - stabilityFactor) * 1e-5
      };
      
      // Update system status
      setSystemStatus({
        reinforcementActive: needsReinforcement,
        reinforcementStrength,
        statusMessage: criticalEvent ? "Critical Event Detected" : "Stable",
        criticalEvent
      });
      
      setMetrics(newMetrics);
      
      // Update history for charts
      setTimeHistory(prev => {
        const newPoint = {
          timestamp: t,
          ...newMetrics
        };
        return [...prev.slice(-100), newPoint];
      });
    };

    const interval = setInterval(updateMetrics, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Helper components
  const MetricCard = ({ title, value, unit = '%', precision = 4, color = "text-violet-400" }) => (
    <div className="p-4 border border-violet-500 rounded-lg bg-black/30">
      <div className="text-sm font-medium text-violet-300">{title}</div>
      <div className={`text-2xl font-bold ${color}`}>
        {typeof value === 'number' ? 
          (unit === '%' ? (value * 100).toFixed(precision) : value.toFixed(precision)) : value}
        {unit}
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-violet-950 to-indigo-950 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-8 h-8 text-violet-400" />
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Quantum Time Crystal Dashboard
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              <Activity className="w-6 h-6 text-violet-400 animate-pulse" />
              {systemStatus.criticalEvent && (
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Alert when reinforcement is active */}
          {systemStatus.reinforcementActive && (
            <div className="mb-6 p-4 border border-yellow-500 rounded-lg bg-black/30">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-medium">
                  Reinforcement Active - Current Strength: {(systemStatus.reinforcementStrength * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          )}

          {/* Primary Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Lambda Stability" 
              value={metrics.lambdaStability} 
              unit="" 
              precision={6} 
              color={Math.abs(metrics.lambdaStability - LAMBDA_CRITICAL) > 0.0001 ? "text-yellow-400" : "text-violet-400"}
            />
            <MetricCard title="Quantum Coupling" value={metrics.quantumCoupling} />
            <MetricCard title="Phase Stability" value={metrics.phaseStability} />
            <MetricCard title="Reality Integrity" value={metrics.realityIntegrity} />
          </div>

          {/* Visualization Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="h-80 border border-violet-500 rounded-lg bg-black/30 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value * 1000).toLocaleTimeString()}
                  />
                  <YAxis domain={[0.49, 0.51]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value * 1000).toLocaleTimeString()}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#8B5CF6' }}
                  />
                  <Legend />
                  <ReferenceLine 
                    y={LAMBDA_CRITICAL} 
                    stroke="#EC4899" 
                    strokeDasharray="3 3"
                    label={{ value: 'Critical λ=0.5', fill: '#EC4899' }}
                  />
                  <ReferenceArea
                    y1={0.4999}
                    y2={0.5001}
                    fill="#EC4899"
                    fillOpacity={0.1}
                    stroke="#EC4899"
                    strokeOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lambdaStability" 
                    stroke="#8B5CF6" 
                    name="Lambda (λ)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-80 border border-violet-500 rounded-lg bg-black/30 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value * 1000).toLocaleTimeString()}
                  />
                  <YAxis domain={[0.9, 1]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value * 1000).toLocaleTimeString()}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#8B5CF6' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="stabilityIndex" 
                    stroke="#EC4899" 
                    name="Stability"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="purityLevel" 
                    stroke="#60A5FA" 
                    name="Purity"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="coherence" 
                    stroke="#34D399" 
                    name="Coherence"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Time Warp" value={metrics.timeWarp} />
            <MetricCard title="System Coherence" value={metrics.coherence} />
            <MetricCard title="Energy State" value={metrics.energyState} />
            <MetricCard title="Purity Level" value={metrics.purityLevel} />
          </div>

          {/* System Details Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-violet-500 rounded-lg bg-black/30">
              <h3 className="text-lg font-medium mb-2">System Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={systemStatus.criticalEvent ? "text-yellow-400" : "text-green-400"}>
                    {systemStatus.statusMessage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Stability Index:</span>
                  <span>{(metrics.stabilityIndex * 100).toFixed(4)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate:</span>
                  <span>{metrics.errorRate.toExponential(4)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-violet-500 rounded-lg bg-black/30">
              <h3 className="text-lg font-medium mb-2">Crystal Parameters</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Golden Ratio (φ):</span>
                  <span>{PHI.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Coupling:</span>
                  <span>{CRITICAL_COUPLING}</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety Margin:</span>
                  <span>{SAFETY_MARGIN.toExponential()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Status */}
          <div className="mt-4 text-sm text-violet-300 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${systemStatus.criticalEvent ? "bg-yellow-400" : "bg-green-400"} animate-pulse`}></div>
              <span>Time Crystal {systemStatus.criticalEvent ? "Unstable" : "Stable"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantumTimeCrystalDashboard;