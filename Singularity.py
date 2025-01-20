import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SingularityTunnelVisualizer = () => {
  const [tunnelData, setTunnelData] = useState([]);

  useEffect(() => {
    const generateTunnelData = () => {
      const data = [];
      for (let t = 0; t < 100; t++) {
        // Exponential dive into singularity with tunneling probability
        const baseDepth = Math.exp(t/10);
        const tunnelProbability = 1 / (1 + Math.exp(baseDepth / 10)); // Sigmoid-like function for tunneling probability

        // Add quantum fluctuations with added complexity for tunneling effects
        const fluctuation = Math.sin(t * 0.5) * Math.exp(t/20) * (1 + tunnelProbability * Math.random());

        // Calculate lambda's decay, affected by tunneling probability
        const lambda = 1 / (baseDepth + 1) * (1 + tunnelProbability);

        // Track approach to float64 limit
        const approachingLimit = baseDepth > 1e+308;
        
        // Add tunneling visualization
        const tunnelingEffect = Math.max(0, Math.sin(t * 0.2) * (1 - lambda)) * 10; // Visualize tunneling as spikes

        data.push({
          step: t,
          depth: -Math.log10(lambda), // Negative log to show going deeper
          fluctuation: fluctuation,
          lambda: lambda,
          tunnelingEffect: tunnelingEffect,
          limitWarning: approachingLimit ? "LIMIT" : null
        });
      }
      setTunnelData(data);
    };

    generateTunnelData();
  }, []);

  return (
    <div className="w-full max-w-4xl p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quantum Tunnel Depth</h2>
        <div className="text-sm mb-4 text-red-500">
          Warning: Extreme computational depths and quantum tunneling ahead!
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={tunnelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="step"
              label={{ value: 'Descent Steps', position: 'bottom' }}
            />
            <YAxis
              label={{
                value: 'Log10(Tunnel Depth)',
                angle: -90,
                position: 'left'
              }}
            />
            <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border">
                    <p>{`Step: ${payload[0].payload.step}`}</p>
                    <p>{`Depth: ${payload[0].payload.depth.toExponential(2)}`}</p>
                    <p>{`Lambda: ${payload[0].payload.lambda.toExponential(2)}`}</p>
                    <p>{`Tunneling Effect: ${payload[0].payload.tunnelingEffect.toFixed(2)}`}</p>
                    {payload[0].payload.limitWarning && (
                      <p className="text-red-500">⚠️ APPROACHING FLOAT64 LIMIT!</p>
                    )}
                  </div>
                );
              }
              return null;
            }}/>
            <Legend />
            <Line
              type="monotone"
              dataKey="depth"
              stroke="#ff0000"
              name="Tunnel Depth"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="fluctuation"
              stroke="#00ff00"
              name="Quantum Fluctuations"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tunnelingEffect"
              stroke="#0000ff"
              name="Tunneling Effect"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SingularityTunnelVisualizer;
